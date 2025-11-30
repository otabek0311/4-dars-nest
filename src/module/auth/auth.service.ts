import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { User } from "./entities/user-entity";
import { CreateUserDto, LoginDto, VerifyDto } from "./dto/user.dto";
import * as bcrypt from "bcrypt";
import * as nodemailer from "nodemailer";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class AuthService {
  private transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "abdullayevotabek414@gmail.com",
      pass: process.env.APP_KEY as string,
    },
  });

  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService
  ) {}

  async register(createUserDto: CreateUserDto): Promise<{message : string}> {
    const { username, email, password } = createUserDto;

    const foundedUser = await this.userRepo.findOne({ where: { email } });

    if (foundedUser) {
      throw new UnauthorizedException("user alredy exsits");
    }

    const hash = await bcrypt.hash(password, 10);

    const randomNumber = +Array.from({ length: 6 }, () =>
      Math.floor(Math.random() * 10)
    ).join("");

    this.transporter.sendMail({
      from: "abdullayevotabek414@gmail.com",
      to: email,
      subject: "Test",
      text: `${randomNumber}`,
    });

    const time = Date.now() + 120000;

    const newUser = this.userRepo.create({
      username,
      email,
      password: hash,
      otp: randomNumber,
      otpTime: time,
    });

    await this.userRepo.save(newUser)

    return {message:"Registered"};
  }

      async veryfy(veryfyDto: VerifyDto):Promise<{message:string}> {
          const{email,otp}= veryfyDto

          const foundedUser = await this.userRepo.findOne({where:{email}})

          if(!foundedUser){
              throw new UnauthorizedException("user not found")
          }

          const time = Date.now()

          if(+foundedUser.otpTime < time){
              throw new UnauthorizedException("otp time expired")
          }

          if(+foundedUser.otp !== +otp){
              throw new UnauthorizedException("otp not match")
          }

          await this.userRepo.update(foundedUser.id,{ isVerify:"true", otp:0 , otpTime:0 })

          return {message:"Verify"}
      }

    async login(loginDto: LoginDto): Promise<{ access_token: string }> {

      const{email,password}= loginDto

      const foundedUser = await this.userRepo.findOne({where:{email}});
      if (!foundedUser) {
        throw new UnauthorizedException("user not found");
      }

      const decode = await bcrypt.compare(password,foundedUser.password)

      if(decode && foundedUser.isVerify){
         const  payload = { sub: foundedUser.id, username: foundedUser.username,role:foundedUser.role}
         return {
          access_token: await this.jwtService.signAsync(payload),
         }
      }   else{
          throw new BadRequestException("invalid password")
      }
    }

  async deleteUser(id:number):Promise<boolean>{
    const foundedUser = await this.userRepo.findOne({where:{id}})

    if(!foundedUser){
      throw new UnauthorizedException("user not found")
    }

    await this.userRepo.delete({id})

    return true
  }
}
