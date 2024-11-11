import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { UsersService } from "src/users/users.service";
import { Strategy , ExtractJwt} from 'passport-jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(private usersService: UsersService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    async validate(payload: any){
        return { userId: payload.sub, email: payload.email };
    }

}