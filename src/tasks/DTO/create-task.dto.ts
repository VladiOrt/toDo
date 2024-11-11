import { IsString, IsOptional, IsDateString, IsEnum, IsNotEmpty } from 'class-validator';

export enum statusTask {
  PENDING = 'PENDIENTE',
  IN_PROGRESS = 'EN PROGRESO',
  COMPLETED = 'COMPLETADO',
}

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDateString()
  @IsOptional()
  deadLine?: string;

  @IsEnum(statusTask)
  @IsNotEmpty()
  status: statusTask;

  @IsOptional()
  userId?: string;
}
