import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ArrayUnique,
  IsUrl,
} from "class-validator";
import { IsUrlFlexible } from "../../common/decorators/is-url-flexible.decorator";

export class UpdateProjectDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  subtitle?: string;

  @IsOptional()
  @IsString()
  brief?: string;

  @IsOptional()
  @IsString()
  description?: string;

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
