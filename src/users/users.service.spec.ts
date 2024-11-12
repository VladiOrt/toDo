jest.mock('bcryptjs')
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './users.schema';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './user-register.dto';

describe('UsersService', () => {
  let service: UsersService;
  let userModel: any;

  
  beforeEach(async () => {
    jest.mock('bcryptjs');
    const mockUserModel = {      
      constructor: jest.fn(),
      create: jest.fn(),
      findOne: jest.fn().mockReturnThis(),
      exec: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userModel = module.get(getModelToken(User.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debería estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    beforeEach(() => {
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword123');
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('debería crear un nuevo usuario con contraseña encriptada', async () => {
      const createUserDto: CreateUserDto = { email: 'test@example.com', password: 'password123' };
  
      userModel.create.mockResolvedValueOnce({ email: createUserDto.email, password: 'hashedPassword123' });
  
      const result = await service.createUser(createUserDto);
  
      expect(bcrypt.hash).toHaveBeenCalledWith(createUserDto.password, 10);
      expect(userModel.create).toHaveBeenCalledWith({ email: createUserDto.email, password: 'hashedPassword123' });
      expect(result).toEqual({ email: createUserDto.email, password: 'hashedPassword123' });
    });
  });
  


  describe('findUserByUsername', () => {
    it('debería retornar un usuario si el email coincide', async () => {
      const mockUser = { email: 'test@example.com', password: 'hashedPassword' };
      userModel.findOne.mockReturnThis();
      userModel.exec.mockResolvedValue(mockUser);

      const result = await service.findUserByUsername('test@example.com');
      expect(result).toEqual(mockUser);
      expect(userModel.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(userModel.exec).toHaveBeenCalled();
    });

    it('debería retornar null si no se encuentra el usuario', async () => {
      userModel.findOne.mockReturnThis();
      userModel.exec.mockResolvedValue(null);

      const result = await service.findUserByUsername('notfound@example.com');
      expect(result).toBeNull();
    });
  });

  describe('validateUser', () => {
    it('debería validar las credenciales correctas', async () => {
      const mockUser = { email: 'test@example.com', password: 'hashedPassword' };
      const createUserDto: CreateUserDto = { email: 'test@example.com', password: 'password123' };

      userModel.findOne.mockReturnThis();
      userModel.exec.mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'compare').mockImplementation(async () => true);

      const result = await service.validateUser(createUserDto);
      expect(result).toEqual(mockUser);
    });

    it('debería retornar null si las credenciales son incorrectas', async () => {
      const createUserDto: CreateUserDto = { email: 'test@example.com', password: 'wrongPassword' };
      const mockUser = { email: 'test@example.com', password: 'hashedPassword' };

      userModel.findOne.mockReturnThis();
      userModel.exec.mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'compare').mockImplementation(async () => false);

      const result = await service.validateUser(createUserDto);
      expect(result).toBeNull();
    });

    it('debería retornar null si el usuario no existe', async () => {
      userModel.findOne.mockReturnThis();
      userModel.exec.mockResolvedValue(null);

      const createUserDto: CreateUserDto = { email: 'notfound@example.com', password: 'password123' };
      const result = await service.validateUser(createUserDto);
      expect(result).toBeNull();
    });
  });
});
