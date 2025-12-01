import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto, LoginDto, VerifyDto } from "./dto/user.dto";
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { AuthGuard } from "src/common/pipe/guard/auth.guard";
import { RolesGuard } from "src/common/pipe/guard/roles.guard";
import { UserRole } from "src/common/pipe/constants/role";
import { Roles } from "src/common/pipe/decorators/roles.decorator";


@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: CreateUserDto })
  @ApiUnauthorizedResponse({ description: "User is exits" })
  @ApiCreatedResponse({ description: "Registered" })
  @HttpCode(201)
  @Post("register")
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @ApiBody({ type: VerifyDto })
  @ApiUnauthorizedResponse({ description: "User not found" })
  @ApiUnauthorizedResponse({ description: "Otp time expired" })
  @ApiBadRequestResponse({ description: "Wrong otp" })
  @ApiOkResponse({ description: "Verify" })
  @HttpCode(200)
  @Post("verify")
  verify(@Body() verifyDto: VerifyDto) {
    return this.authService.veryfy(verifyDto);
  }

  @ApiBody({ type: LoginDto })
  @ApiUnauthorizedResponse({ description: "User not found" })
  @ApiBadRequestResponse({ description: "Invalid password" })
  @ApiOkResponse()
  @HttpCode(200)
  @Post("login")
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @ApiForbiddenResponse({ description: "Forbidden." })
  @ApiUnauthorizedResponse({ description: "Unauthorized." })
  @ApiUnauthorizedResponse({ description: "User not found" })
  @ApiOkResponse()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @HttpCode(200)
  @Delete("delete/:id")
  deleteUser(@Param("id") id: string) {
    return this.authService.deleteUser(+id);
  }
}
