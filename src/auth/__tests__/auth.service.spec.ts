import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

const mockUser = {
  _id: '1',
  username: 'testuser',
  password: 'hashedPassword',
};

const mockUsersService = {
  validateUser: jest.fn(),
};

const mockJwtService = {
  sign: jest.fn().mockReturnValue('mockJwtToken'),
};

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('debería generar un token JWT al hacer login', async () => {
    mockUsersService.validateUser.mockResolvedValue(mockUser);

    const result = await authService.login(mockUser);
    expect(result.access_token).toBe('mockJwtToken');
    expect(mockJwtService.sign).toHaveBeenCalledWith({
      username: mockUser.username,
      sub: mockUser._id,
    });
  });

  it('debería retornar null si la validación falla', async () => {
    mockUsersService.validateUser.mockResolvedValue(null);

    const result = await authService.validateUser({email: 'testuser@gmail.com', password: 'wrongpassword'});
    expect(result).toBeNull();
  });
});