import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpsertAboutDto {
  @IsOptional()
  @IsString()
  id?: string;

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
