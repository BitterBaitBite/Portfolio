import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ArrayUnique,
  IsUrl,
} from "class-validator";
import { IsUrlFlexible } from "../../common/decorators/is-url-flexible.decorator";

export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  subtitle?: string;

  @IsNotEmpty()
  @IsString()
  brief!: string;

  @IsNotEmpty()
  @IsString()
  description!: string;

  @IsOptional()
  @IsUrl({ require_tld: false })
  url?: string;

  @IsOptional()
  @IsUrl({ require_tld: false })
  thumbnail?: string;

  @IsOptional()
  @IsUrl({ require_tld: false })
  image?: string;

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsString({ each: true })
  tagIds?: string[];
}
