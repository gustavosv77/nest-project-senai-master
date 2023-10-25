import { Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';

@Injectable()
export class TelegramService {
  private bot: Telegraf;
  private chatId: string
//   constructor() {
//     //Substitua 'SEU_TOKEN' pelo token do seu bot do Telegram
//     this.bot = new Telegraf('6929935727:AAGlXC4BMnLCkPxcS8Stfav-z2I7G3TfAa4');
//     this.chatId = "-1002033466946";
//     }

    async sendTelegrafText ({message, chatid, tokenbot}:{message: string, chatid: number, tokenbot: string}) {
        try {
            const bot = new Telegraf(tokenbot);
            await bot.telegram.sendMessage(chatid, message);
            console.log("Mensagem enviada")
            
        } catch (error) {
            console.log("sendTelegrafText", error)
        }
    }
}
