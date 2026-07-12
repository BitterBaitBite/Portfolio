import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateCurriculumVitaeDto } from "./dto/create-curriculum-vitae.dto";
import { UpdateCurriculumVitaeDto } from "./dto/update-curriculum-vitae.dto";
import { UpsertCurriculumVitaeDto } from "./dto/upsert-curriculum-vitae.dto";

@Injectable()
export class CurriculumVitaeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateCurriculumVitaeDto) {
    return this.prisma.curriculumVitae.create({ data: dto });
  }

  async find() {
    return this.prisma.curriculumVitae.findFirst({
      orderBy: { updatedAt: "desc" },
    });
  }

  async findOne(id: string) {
    const curriculum = await this.prisma.curriculumVitae.findUnique({
      where: { id },
    });
    if (!curriculum) {
      throw new NotFoundException(`Curriculum Vitae ${id} not found`);
    }
    return curriculum;
  }

  async update(id: string, dto: UpdateCurriculumVitaeDto) {
    await this.findOne(id);
    return this.prisma.curriculumVitae.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.curriculumVitae.delete({ where: { id } });
  }

  async upsert(dto: UpsertCurriculumVitaeDto) {
    if (dto.id) {
      const curriculum = await this.prisma.curriculumVitae.findUnique({
        where: { id: dto.id },
      });
      if (curriculum) {
        return this.prisma.curriculumVitae.update({
          where: { id: dto.id },
          data: {
            summary: dto.summary,
            experience: dto.experience,
            education: dto.education,
            credentials: dto.credentials,
            languages: dto.languages,
            fileUrl: dto.fileUrl,
          },
        });
      }
    }

    return this.prisma.curriculumVitae.create({
      data: {
        summary: dto.summary,
        experience: dto.experience,
        education: dto.education,
        credentials: dto.credentials,
        languages: dto.languages,
        fileUrl: dto.fileUrl,
      },
    });
  }
}
