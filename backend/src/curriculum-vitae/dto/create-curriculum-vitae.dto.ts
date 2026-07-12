import { IsArray, IsOptional, IsString, IsUrl } from "class-validator";

export class CreateCurriculumVitaeDto {
  @IsOptional()
  @IsString()
  summary?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  experience?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  education?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  credentials?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  languages?: string[];

  @IsOptional()
  @IsUrl({ require_tld: false })
  fileUrl?: string;
}
