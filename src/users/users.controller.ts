import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService:  UsersService){}

    @Post('/register')
    async register(@Body() body: {username: string; password: string }){
        return this.userService.createUser(body.username, body.password);
    }
}
