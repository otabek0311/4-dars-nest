import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length, MinLength } from "class-validator";

export class CreateUserDto {
    @ApiProperty({description: "about username", default: "ali"})
    @IsString()
    @MinLength(3)
    username: string;

    @ApiProperty({default: "abdullayevotabek414@gmail.com"})
    @IsEmail()
    email: string;

    @ApiProperty({default: "otabekkk1"})
    @IsString()
    @Length(8, 50)
    password: string;
}

export class VerifyDto {
    @ApiProperty({default: "abdullayevotabek414@gmail.com"})
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    @Length(6, 6)
    otp: string;
}

export class LoginDto {
    @ApiProperty({default: "abdullayevotabek414@gmail.com"})
    @IsEmail()
    email: string;

    @ApiProperty({default: "otabekkk1"})
    @IsString()
    @Length(8, 50)
    password: string;
}