import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateContactDto } from "./dto/create-contact.dto";
import { UpdateContactDto } from "./dto/update-contact.dto";
import { UpsertContactDto } from "./dto/upsert-contact.dto";

@Injectable()
export class ContactService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateContactDto) {
    return this.prisma.contact.create({ data: dto });
  }

  async find() {
    return this.prisma.contact.findFirst({ orderBy: { updatedAt: "desc" } });
  }

  async findOne(id: string) {
    const contact = await this.prisma.contact.findUnique({ where: { id } });
    if (!contact) {
      throw new NotFoundException(`Contact entry ${id} not found`);
    }
    return contact;
  }

  async update(id: string, dto: UpdateContactDto) {
    await this.findOne(id);
    return this.prisma.contact.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.contact.delete({ where: { id } });
  }

  async upsert(dto: UpsertContactDto) {
    if (dto.id) {
      const contact = await this.prisma.contact.findUnique({
        where: { id: dto.id },
      });
      if (contact) {
        return this.prisma.contact.update({
          where: { id: dto.id },
          data: {
            email: dto.email,
            phone: dto.phone,
            linkedin: dto.linkedin,
            github: dto.github,
          },
        });
      }
    }

    return this.prisma.contact.create({
      data: {
        email: dto.email,
        phone: dto.phone,
        linkedin: dto.linkedin,
        github: dto.github,
      },
    });
  }
}
