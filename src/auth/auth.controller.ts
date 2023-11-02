// import { Controller, Request, Post, UseGuards } from '@nestjs/common';
// import { LocalAuthGuard } from './decorators/local-auth.guard';
// import { ApiOperation, ApiTags } from '@nestjs/swagger';

// @ApiTags('Auth')
// @Controller('auth')
// export class AuthController {
//   @Post('login')
//   @ApiOperation({ summary: 'Logar usuário' })
//   @UseGuards(LocalAuthGuard)
//   async login(@Request() req) {
//     return req.user;
//   }
// }

import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from './decorators/auth.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/user/entities/user.entity';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SignInRecoverDto } from './dto/signInRecover.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({summary: "Gerar token de login do usuário."})
  async signIn(@Body() LoginDto: LoginDto) {
   const user:User = await this.authService.validateUser(LoginDto.email, LoginDto.password)
   return this.authService.login(user)
  }

  @Post('login-recover')
  @ApiOperation({summary: "Validar token do usuário."})
  async signInRecover(@Body() recoverDto: SignInRecoverDto) {
   const user:User = await this.authService.validateUser(recoverDto.email, undefined, recoverDto.token)
   return this.authService.login(user)
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('profile')
  @ApiOperation({summary: "Mostrar informações do usuário logado."})
  getProfile(@Request() req) {
    return req.user;
  }
}
