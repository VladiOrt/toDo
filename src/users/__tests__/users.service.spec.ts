import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { getModelToken } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { User } from '../users.schema';

const mockUser = {
  _id: '673204129bdad691e7ae0550',
  email: 'testuser@gmail.com',
  password: '$2a$10$1FjZ85OU.GqKclAgZdaEO.Hkza2hcYJqCLNdAgNGrhsGCVYWQpIUa',
};

const mockUserModel = {
  findOne: jest.fn().mockResolvedValue(mockUser),
  save: jest.fn(),
  create: jest.fn(),
};

describe('UsersService', () => {
  let usersService: UsersService;
  let userModel: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    userModel = module.get<Model<User>>(getModelToken(User.name));
  });

  it('debería crear un nuevo usuario', async () => {
    jest.spyOn(bcrypt, 'hash').mockResolvedValue('$2a$10$1FjZ85OU.GqKclAgZdaEO.Hkza2hcYJqCLNdAgNGrhsGCVYWQpIUa');

    const newUser = await usersService.createUser({email:'testuser@gmail.com', password:'password123'});
    expect(newUser).toBeDefined();
    expect(newUser.email).toEqual('testuser@gmail.com');
    expect(userModel.create).toHaveBeenCalled();
  });

  it('debería encontrar un usuario por nombre de usuario', async () => {
    const user = await usersService.findUserByUsername('testuser@gmail.com');
    expect(user).toBeDefined();
    expect(user?.email).toEqual('testuser@gmail.com');
  });

  it('debería validar un usuario correctamente', async () => {
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
    const user = await usersService.validateUser({email:'testuser@gmail.com', password:'password123'});
    expect(user).toBeDefined();
    expect(user?.email).toEqual('testuser@gmail.com');
  });

  it('debería retornar null para una contraseña incorrecta', async () => {
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);
    const user = await usersService.validateUser({email:'testuser@gmail.com', password:'wrongpassword'});
    expect(user).toBeNull();
  });
});
