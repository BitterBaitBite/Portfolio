import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { PrismaService } from "../prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

describe("AuthService", () => {
  let service: AuthService;
  let prismaService: PrismaService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
            },
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prismaService = module.get<PrismaService>(PrismaService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe("login", () => {
    it("should return access token on successful login", async () => {
      const email = "test@example.com";
      const password = "password123";
      const hashedPassword = await bcrypt.hash(password, 10);

      // Mock usuario en la BD
      jest.spyOn(prismaService.user, "findUnique").mockResolvedValue({
        id: "1",
        email,
        username: "testuser",
        password: hashedPassword,
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      // Mock JWT sign
      jest.spyOn(jwtService, "sign").mockReturnValue("mocked_token");

      const result = await service.login(email, password);

      expect(result).toEqual({ accessToken: "mocked_token" });
      expect(jwtService.sign).toHaveBeenCalledWith({
        email,
        sub: "1",
        role: "admin",
      });
    });

    it("should throw error on invalid credentials", async () => {
      const email = "test@example.com";
      const password = "wrongpassword";

      jest.spyOn(prismaService.user, "findUnique").mockResolvedValue(null);

      await expect(service.login(email, password)).rejects.toThrow(
        "Invalid credentials",
      );
    });
  });
});
