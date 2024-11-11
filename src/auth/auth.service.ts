import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService
    ){}

    async validateUser(username: string, password: string){
        const user = await this.userService.validateUser(username, password);
        if(user){
            const { password, ...result } = user;
            return result;
        } 
        return null;
    }

    async login(user: any){
        const payload = { username: user.username, sub: user._id };
        return{
            access_token: this.jwtService.sign(payload)
        }
    }

}
