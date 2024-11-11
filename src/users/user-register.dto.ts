import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDto {
  
  @IsString()
  @IsEmail({}, { message: 'El email no es valido'})
  @IsNotEmpty({ message: 'El email es obligatorio'})
  email: string;
  
  @IsString({ message: 'La contraseña debe ser un string' } )
  @IsNotEmpty({ message: 'La contraseña es obligatoria' } )
  password: string;
}
