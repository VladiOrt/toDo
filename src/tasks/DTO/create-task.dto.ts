import { IsString, IsOptional, IsDateString, IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum statusTask {
  PENDING = 'PENDIENTE',
  IN_PROGRESS = 'EN PROGRESO',
  COMPLETED = 'COMPLETADO',
}

export class CreateTaskDto {
  @ApiProperty({ example: 'Tarea 1', description: 'Titulo de tarea' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Tarea para avanzar proyecto x', description: 'Descripcion de tarea' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: '2024-11-11T23:59:59Z', description: 'Fecha y hora de vencimiento de tarea' })
  @IsDateString()
  @IsOptional()
  deadLine?: string;

  @ApiProperty({ example: 'PENDIENTE', description: 'Estado de tarea ("PENDIENTE", "EN PROGRESO", "COMPLETADO" )' })
  @IsEnum(statusTask)
  @IsNotEmpty()
  status: statusTask;

  @IsOptional()
  userId?: string;
}
