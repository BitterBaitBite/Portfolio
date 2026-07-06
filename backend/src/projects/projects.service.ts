import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { ProjectFilterDto } from "./dto/project-filter.dto";

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateProjectDto) {
    console.log(dto);
    return this.prisma.project.create({
      data: {
        title: dto.title,
        subtitle: dto.subtitle,
        brief: dto.brief,
        description: dto.description,
        url: dto.url,
        thumbnail: dto.thumbnail,
        image: dto.image,
        tags: dto.tagIds?.length
          ? { connect: dto.tagIds.map((id) => ({ id })) }
          : undefined,
      },
      include: { tags: true },
    });
  }

  async findAll(filter: ProjectFilterDto) {
    const where: any = { AND: [] };

    if (filter.id) {
      where.AND.push({ id: filter.id });
    }
    if (filter.title) {
      where.AND.push({
        title: { contains: filter.title, mode: "insensitive" },
      });
    }
    if (filter.subtitle) {
      where.AND.push({
        subtitle: { contains: filter.subtitle, mode: "insensitive" },
      });
    }
    if (filter.tags?.length) {
      where.AND.push(
        ...filter.tags.map((tag) => ({ tags: { some: { name: tag } } })),
      );
    }

    return this.prisma.project.findMany({
      where: where.AND.length ? where : undefined,
      include: { tags: true },
      orderBy: { createdAt: "desc" },
    });
  }

  async findOne(id: string) {
    const project = await this.prisma.project.findUnique({
      where: { id },
      include: { tags: true },
    });

    if (!project) {
      throw new NotFoundException(`Project ${id} not found`);
    }

    return project;
  }

  async update(id: string, dto: UpdateProjectDto) {
    await this.findOne(id);

    return this.prisma.project.update({
      where: { id },
      data: {
        title: dto.title,
        subtitle: dto.subtitle,
        brief: dto.brief,
        description: dto.description,
        url: dto.url,
        thumbnail: dto.thumbnail,
        image: dto.image,
        tags: dto.tagIds
          ? { set: dto.tagIds.map((tagId) => ({ id: tagId })) }
          : undefined,
      },
      include: { tags: true },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.project.delete({ where: { id } });
  }
}
