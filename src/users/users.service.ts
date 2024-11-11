import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>){}

    async createUser(username: string, password: string): Promise<User>{
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new this.userModel({ username, password: hashedPassword });
        return newUser.save();
    }

    async findUserByUsername(username: string): Promise<User | null> {
        return this.userModel.findOne({ username }).exec();        
    }

    async validateUser(username: string, password: string): Promise<User | null>{
        const user = await this.findUserByUsername(username);
        if(user && (await bcrypt.compare(password, user.password))){
            return user;
        }
        return null;
    }
}
