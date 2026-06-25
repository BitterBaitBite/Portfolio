import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { TagCategory } from "../enums/tag-category.enum";

export class CreateTagDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsEnum(TagCategory)
  category!: TagCategory;
}
