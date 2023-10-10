import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService){
  }

  create(createUserDto: CreateUserDto) {
    this.prismaService.user.create({data: createUserDto}).then((res)=>{
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

  update(id: number, updateAuthDto: UpdateUserDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
