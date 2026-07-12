import { IsEmail, IsOptional, IsString, IsUrl } from "class-validator";

export class CreateContactDto {
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
