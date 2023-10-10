import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Matches, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8, { message: 'Senha deve conter 8 digitos' })
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
      message: 'Senha muito fraca',
    })
    @ApiProperty({
      example: '@Ab12345',
      description:
        'Senha deve conter 8 digitos, contendo: um simbolo, uma letra maiuscula e minuscula e um numero',
    })
    password: string;
    
    @IsString()
    picture: string;
}
