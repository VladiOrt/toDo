import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/user-register.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService
    ){}

    async validateUser( createUserDto : CreateUserDto){
        const user = await this.userService.validateUser(createUserDto);
        if(user){
            const { password, ...result } = user;
            return result;
        } 
        return null;
    }

    async login(user: any){
        console.log("Usuario " ,user )
        
        const { email, _id }  = user._doc; 
        console.log("Tok" ,email , "--", _id )
        const payload = { email, sub:_id.toString() };
        console.log("Tok" ,payload )
        return{
            access_token: this.jwtService.sign(payload)
        }
    }

}
