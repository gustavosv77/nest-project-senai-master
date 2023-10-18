import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'user32@emil.com' })
  email: string;

  @ApiProperty({ example: '@Ab12345' })
  password: string;
}
