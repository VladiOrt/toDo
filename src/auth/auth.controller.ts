import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/user-register.dto';

@Controller('api/login')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('/')
    async login(@Body() createUserDto: CreateUserDto){
        const user = await this.authService.validateUser(createUserDto);
        if(!user) {
            return { error: 'Intenta con una credencial valida' };
        }
        return this.authService.login(user);
    }
}