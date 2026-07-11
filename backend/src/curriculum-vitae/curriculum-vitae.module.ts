import { Module } from "@nestjs/common";
import { CurriculumVitaeController } from "./curriculum-vitae.controller";
import { CurriculumVitaeService } from "./curriculum-vitae.service";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [CurriculumVitaeController],
  providers: [CurriculumVitaeService],
})
export class CurriculumVitaeModule {}
