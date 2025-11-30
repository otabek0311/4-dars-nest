import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './entities/user-entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtConstants } from 'src/common/pipe/constants/jwt-constants';

@Module({
  imports:[TypeOrmModule.forFeature([User]),
 JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '600s' },
    }),],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
