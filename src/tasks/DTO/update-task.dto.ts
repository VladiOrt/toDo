// todo/dto/update-todo.dto.ts
import { IsString, IsOptional, IsDateString, IsEnum } from 'class-validator';
import { statusTask } from './create-task.dto';

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDateString()
  @IsOptional()
  deadLine?: string;

  @IsEnum(statusTask)
  @IsOptional()
  status?: statusTask;
}
