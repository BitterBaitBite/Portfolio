import { IsEnum, IsOptional, IsString } from "class-validator";
import { TagCategory } from "../enums/tag-category.enum";

export class UpdateTagDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEnum(TagCategory)
  category?: TagCategory;
}
