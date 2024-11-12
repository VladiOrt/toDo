// todo/dto/update-todo.dto.ts
import { IsString, IsOptional, IsDateString, IsEnum } from 'class-validator';
import { statusTask } from './create-task.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto {
  @ApiProperty({ example: 'Tarea 1', description: 'Titulo de tarea' })
  @IsString()
  @IsOptional()
  title?: string;

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
  @IsOptional()
  status?: statusTask;
}
