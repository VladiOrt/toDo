import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {

  @ApiProperty({ example: 'usuario@example.com', description: 'El correo del usuario' })
  @IsString()
  @IsEmail({}, { message: 'El email no es valido'})
  @IsNotEmpty({ message: 'El email es obligatorio'})
  email: string;
  
  @ApiProperty({ example: 'contraseña123', description: 'La contraseña del usuario' })
  @IsString({ message: 'La contraseña debe ser un string' } )
  @IsNotEmpty({ message: 'La contraseña es obligatoria' } )
  password: string;
}
