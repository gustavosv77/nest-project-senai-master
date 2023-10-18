// import { Module } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { UserModule } from 'src/user/user.module';
// import { UserService } from 'src/user/user.service';
// import { PrismaModule } from 'src/prisma/prisma.module';

// @Module({
//   imports: [PrismaModule],
//   providers: [AuthService, UserService],
// })
// export class AuthModule {}

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserService } from 'src/user/user.service';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { expiresIn: '2h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
