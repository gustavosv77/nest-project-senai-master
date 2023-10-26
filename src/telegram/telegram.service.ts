import { Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { SendMessageDto } from './dto/sendMessage.dto';
import { MediaGroup } from 'telegraf/typings/telegram-types';
import * as cron from 'node-cron'

@Injectable()
export class TelegramService {
  //     token = 6929935727:AAGlXC4BMnLCkPxcS8Stfav-z2I7G3TfAa4
  //     chatId = -1002033466946

  private base64ToImage(base64: string): Buffer {
    const base64Data = base64.replace(/^data:image\/jpeg;base64,/, '');
    return Buffer.from(base64Data, 'base64');
  }

  private async sendTelegrafText({ message, chatid, tokenbot }: SendMessageDto) {
    try {
      const bot = new Telegraf(tokenbot);
      await bot.telegram.sendMessage(chatid, message);
      console.log('Mensagem enviada');
    } catch (error) {
      console.log('sendTelegrafText', error);
    }
  }

  private async sendTelegrafMedia({
    message,
    chatid,
    tokenbot,
    images,
  }: SendMessageDto) {
    const bot = new Telegraf(tokenbot);
    const media: MediaGroup = images.map((image) => ({
      type: 'photo',
      media: { source: this.base64ToImage(image) },
      caption: '',
    }));

    media[images.length - 1].caption = message;

    await bot.telegram.sendMediaGroup(chatid, media);
    console.log('Mensagem enviada');
  }

  async sendMessageSwitch(sendMessageDto: SendMessageDto) {
    sendMessageDto.images
      ? this.sendTelegrafMedia(sendMessageDto)
      : this.sendTelegrafText(sendMessageDto);
  }

  cronConvert (schedule: string | Date) {
    schedule = new Date(schedule); 
    const day = schedule.getDate(); // Obtém o dia do mês (1-31)
    const month = schedule.getMonth() + 1; // Obtém o mês (0-11), adicionamos 1 para obter o mês de 1 a 12
    const years = schedule.getFullYear(); // Obtém o ano com quatro dígitos (ex: 2023)
    const hour = schedule.getHours(); // Obtém a hora (0-23)
    const minuts = schedule.getMinutes();// Obtém os minutos (0-59)
    return `${minuts} ${hour} ${day} ${month} *`;
  }

  async sendSchedule (cronConvert: string, sendMessageDto: SendMessageDto) {
    cron.schedule(cronConvert, async () => {
      await this.sendMessageSwitch(sendMessageDto);
    });
  }
}
