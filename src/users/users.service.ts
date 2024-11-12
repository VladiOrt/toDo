import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.schema';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './user-register.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>){}

    async createUser(createUserDto: CreateUserDto): Promise<User>{
        const { email, password } = createUserDto
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await this.userModel.create({ email, password: hashedPassword });
        return newUser;
    }

    async findUserByUsername(email: string): Promise<User | null> {
        return this.userModel.findOne({ email }).exec();        
    }

    async validateUser(createUserDto: CreateUserDto): Promise<User | null>{
        const { email, password } = createUserDto
        const user = await this.findUserByUsername(email);
        if(user && (await bcrypt.compare(password, user.password))){
            return user;
        }
        return null;
    }
}
