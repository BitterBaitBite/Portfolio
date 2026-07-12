import { IsEmail, IsOptional, IsString, IsUrl } from "class-validator";

export class UpsertContactDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsUrl({ require_tld: false })
  linkedin?: string;

  @IsOptional()
  @IsUrl({ require_tld: false })
  github?: string;
}
