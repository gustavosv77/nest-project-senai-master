import { ApiProperty } from "@nestjs/swagger"

export class SendMessageDto { 
    @ApiProperty({example: "Olá estou funcionando"})
    message: string;

    @ApiProperty({example: -1002033466946})
    chatid: number;

    @ApiProperty({example: "6929935727:AAGlXC4BMnLCkPxcS8Stfav-z2I7G3TfAa4"})
    tokenbot: string;
    
    @ApiProperty({example: []})
    images: string[] | undefined;

    @ApiProperty({example: "2023-10-26T20:00:00"})
    schedule: string | Date
}