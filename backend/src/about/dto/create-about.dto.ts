import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateAboutDto {
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  subtitle?: string;

  @IsNotEmpty()
  @IsString()
  body!: string;
}
