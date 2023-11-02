import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsInt } from "class-validator"

export class SignInRecoverDto {
    @ApiProperty({example: "usuario@mail.com"})
    @IsEmail()
    email: string

    @ApiProperty({example: 123456})
    @IsInt()
    token: number
}