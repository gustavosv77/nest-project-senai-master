import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Matches, MinLength } from "class-validator";

export class CreateUserDto {
    @ApiProperty({ example: 'Cleiton Souza'})
    @IsString()
    name: string;

    @ApiProperty({
      example: 'usuario123@mail.com',
      description:
        'Email deve conter caracteres seguidos de @ e .',
    })
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
    @ApiProperty({ example: 'https://i.pinimg.com/736x/39/0e/4a/390e4aa2c02a1614a143256fa1b9df89.jpg'})
    picture: string;
}
