import { IsString, Length, Max, min, Min, MinLength } from "class-validator";

export class CreateUserDto {

    @IsString()
    @MinLength(3)
    username: string;

    @IsString()
    @Length(3,255)
    email: string;

    @IsString()
    @MinLength(6)
    password: string;
}

export class VerifyDto {
    @IsString()
    @MinLength(3)   
    email: string;

    @IsString()
    @Max(999999)
    @Min(10000)
    otp: number;
}

export class LoginDto {
    @IsString()
    @MinLength(3)
    email: string;

    @IsString()
    @MinLength(6)
    password: string;
}