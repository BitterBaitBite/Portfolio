import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateAboutDto } from "./dto/create-about.dto";
import { UpdateAboutDto } from "./dto/update-about.dto";
import { UpsertAboutDto } from "./dto/upsert-about.dto";

@Injectable()
export class AboutService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateAboutDto) {
    return this.prisma.about.create({ data: dto });
  }

  async find() {
    return this.prisma.about.findFirst({ orderBy: { updatedAt: "desc" } });
  }

  async findOne(id: string) {
    const about = await this.prisma.about.findUnique({ where: { id } });
    if (!about) {
      throw new NotFoundException(`About entry ${id} not found`);
    }
    return about;
  }

  async update(id: string, dto: UpdateAboutDto) {
    await this.findOne(id);
    return this.prisma.about.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.about.delete({ where: { id } });
  }

  async upsert(dto: UpsertAboutDto) {
    if (dto.id) {
      const about = await this.prisma.about.findUnique({
        where: { id: dto.id },
      });
      if (about) {
        return this.prisma.about.update({
          where: { id: dto.id },
          data: { title: dto.title, subtitle: dto.subtitle, body: dto.body },
        });
      }
    }

    return this.prisma.about.create({
      data: { title: dto.title, subtitle: dto.subtitle, body: dto.body },
    });
  }
}
