import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'user32@email.com' })
  email: string;

  @ApiProperty({ example: '@Ab12345' })
  password: string;
}
