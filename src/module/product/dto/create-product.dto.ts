import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, Length } from "class-validator";

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  price: string;

  @ApiProperty({ required: false })
  @IsString()
  image?: string;

  @ApiProperty()
  @IsString()
  @Length(5, 1000)
  desc?: string;
}
