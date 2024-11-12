import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/user-register.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { exampleResponseAuth } from 'src/utils/response-example';

@ApiTags('Login')
@Controller('api/login')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('/')
    @ApiOperation({summary: 'Iniciar sesión'})
    @ApiResponse({status:200, description: JSON.stringify(exampleResponseAuth) })
    @ApiResponse({ status: 401, description: 'Credenciales incorrectas.' })
    async login(@Body() createUserDto: CreateUserDto){
        const user = await this.authService.validateUser(createUserDto);
        if(!user) {
            return { error: 'Intenta con una credencial valida' };
        }
        return this.authService.login(user);
    }
}