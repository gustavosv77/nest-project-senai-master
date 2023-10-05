import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService){
  }

  create(createAuthDto: CreateAuthDto) {
    this.prismaService.auth.create({data: createAuthDto}).then((res)=>{
      console.log("Usuario Cadastrado")
      return res 
    }).catch((error)=>{
      throw Error(`Error ao cadastrar o usuário: ${error}`)
    })  
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
