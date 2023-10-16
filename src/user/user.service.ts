import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    this.prismaService.user
      .create({ data: createUserDto })
      .then((res) => {
        console.log('Usuario Cadastrado');
        return res;
      })
      .catch((error) => {
        throw Error(`Error ao cadastrar o usuário: ${error}`);
      });
  }

  async findAll() {
    const data: User[] = await this.prismaService.user.findMany();

    data.forEach((element)=>{
      delete element.password
    });

    return data;
  }

  async findOne(id?: string, email?:string) {
    
      try {
        if(id){
          const data: User = await this.prismaService.user.findUnique({where: {id},});
          delete data.password;
          return data;
        }
        else{
          const data: User = await this.prismaService.user.findUnique({where: {email},});
          return data;
        }

        
        // delete data.password;

        // const data: User = await this.prismaService.user.findUnique({where: id? {id} : {email},});

      } catch (error) {

        throw Error('id de usuário não existente !');
      }
    }
    
  async update(id: string, updateAuthDto: UpdateUserDto) {
    try {
     const data: User = await this.prismaService.user.update({where: {id}, data: updateAuthDto});

     delete data.password;

     return data;

    } catch (error) {
       return "id de usuário não existente !"
    }
  }

  async remove(id: string) {
    try {
      await this.prismaService.user.delete({where: {id}});
    } catch (error) {
      return "id de usuário não existente !"
    }
  }
}
