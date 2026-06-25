import { IsArray, IsOptional, IsString } from "class-validator";
import { Transform } from "class-transformer";

export class ProjectFilterDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  subtitle?: string;

  @IsOptional()
  @IsArray()
  @Transform(({ value }: { value: string | string[] }) =>
    typeof value === "string"
      ? value
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean)
      : value,
  )
  @IsString({ each: true })
  tags?: string[];
}
