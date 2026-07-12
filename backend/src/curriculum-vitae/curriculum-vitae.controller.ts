import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { CurriculumVitaeService } from "./curriculum-vitae.service";
import { CreateCurriculumVitaeDto } from "./dto/create-curriculum-vitae.dto";
import { UpdateCurriculumVitaeDto } from "./dto/update-curriculum-vitae.dto";
import { UpsertCurriculumVitaeDto } from "./dto/upsert-curriculum-vitae.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Roles } from "../auth/decorators/roles.decorator";
import { UserRole } from "../auth/enums/user-role.enum";

@Controller("curriculum-vitae")
export class CurriculumVitaeController {
  constructor(private readonly curriculumVitaeService: CurriculumVitaeService) {}

  @Get()
  find() {
    return this.curriculumVitaeService.find();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.curriculumVitaeService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  create(@Body() dto: CreateCurriculumVitaeDto) {
    return this.curriculumVitaeService.create(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Put(":id")
  update(@Param("id") id: string, @Body() dto: UpdateCurriculumVitaeDto) {
    return this.curriculumVitaeService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.curriculumVitaeService.remove(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch("upsert")
  upsert(@Body() dto: UpsertCurriculumVitaeDto) {
    return this.curriculumVitaeService.upsert(dto);
  }
}
