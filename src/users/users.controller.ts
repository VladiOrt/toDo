import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './user-register.dto';

@Controller('api/register')
export class UsersController {
    constructor(private readonly userService:  UsersService){}

    @Post('/')
    async register(@Body()  createUserDto: CreateUserDto){
        try{        
            const resultRegister= await this.userService.createUser(createUserDto);

            return {
                ok: true,
                msg: 'Usuario creado con exíto',
                data: resultRegister
            }
        }catch(error){
            return { 
                ok: false,
                msg: 'Ocurrio un error al crear el usuario',
                data: error
            }
        };
       
    }
}
