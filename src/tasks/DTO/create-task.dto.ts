import { IsString, IsOptional, IsDateString, IsEnum } from 'class-validator';

export enum TodoStatus {
  PENDING = 'PENDIENTE',
  IN_PROGRESS = 'EN PROGRESO',
  COMPLETED = 'COMPLETADO',
}

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDateString()
  @IsOptional()
  deadLine?: string;

  @IsEnum(TodoStatus)
  @IsOptional()
  status?: TodoStatus;
}
