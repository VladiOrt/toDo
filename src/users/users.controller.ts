import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './user-register.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

const exampleResponse ={  
    "status": "success",
    "message": "Request successful",
    "data": {
        "ok": true,
        "msg": "Usuario creado con exíto",
        "data": {
            "email": "testuser@gmail.com",
            "password": "$2a$10$EvV2GWDC.eEbpZyAjQJHneXdHoVPSr5c/ZlZ9ChBVxCvSGT73EJay",
            "_id": "6733229a31866f83345e2b62",
            "__v": 0
        }
    }
}


@ApiTags('Registrar Usuario')
@Controller('api/register')
export class UsersController {
    constructor(private readonly userService:  UsersService){}

    @Post('/')
    @ApiOperation({summary: 'Registrar Usuario'})
    @ApiResponse({ status: 200, description: JSON.stringify(exampleResponse) })
    @ApiResponse({ status: 401, description: 'Ocurrio un error al crear el usuario' })
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
