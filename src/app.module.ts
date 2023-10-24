import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TelegramModule } from './telegram/telegram.module';

@Module({
  imports: [UserModule, AuthModule, TelegramModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
