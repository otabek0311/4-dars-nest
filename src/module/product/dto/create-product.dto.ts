import { IsNumber, IsString, Length } from "class-validator";

export class CreateProductDto {
  @IsString()
  @Length(3, 100)
  title: string;

  @IsString()
  @Length(3, 100)
  description: string;

  @IsNumber()
  price: string;
}
