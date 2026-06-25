import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateAboutDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  subtitle?: string;

  @IsOptional()
  @IsString()
  body?: string;
}
