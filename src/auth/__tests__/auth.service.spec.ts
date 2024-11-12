import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { UsersService } from '../../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/user-register.dto';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: Partial<UsersService>;
  let jwtService: Partial<JwtService>;

  beforeEach(async () => {
    usersService = {
      validateUser: jest.fn(),
    };

    jwtService = {
      sign: jest.fn().mockReturnValue('mockJwtToken'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersService },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debería estar definido', () => {
    expect(authService).toBeDefined();
  });

  describe('validateUser', () => {
    it('debería retornar el usuario sin la contraseña si las credenciales son correctas', async () => {
      const mockUser = { email: 'test@example.com', password: 'hashedPassword', _id: '12345' };
      const createUserDto: CreateUserDto = { email: 'test@example.com', password: 'password123' };

      (usersService.validateUser as jest.Mock).mockResolvedValue(mockUser);

      const result = await authService.validateUser(createUserDto);
      expect(result).toEqual({ email: 'test@example.com', _id: '12345' });
    });

    it('debería retornar null si el usuario no es válido', async () => {
      const createUserDto: CreateUserDto = { email: 'invalid@example.com', password: 'wrongPassword' };

      (usersService.validateUser as jest.Mock).mockResolvedValue(null);

      const result = await authService.validateUser(createUserDto);
      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('debería retornar un JWT token válido', async () => {
      const mockUser = { _doc: { email: 'test@example.com', _id: '12345' } };

      const result = await authService.login(mockUser);
      expect(jwtService.sign).toHaveBeenCalledWith({ email: 'test@example.com', sub: '12345' });
      expect(result).toEqual({ access_token: 'mockJwtToken' });
    });
  });
});
