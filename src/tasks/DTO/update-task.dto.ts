// todo/dto/update-todo.dto.ts
import { IsString, IsOptional, IsDateString, IsEnum } from 'class-validator';
import { TodoStatus } from './create-task.dto';

export class UpdateTodoDto {
  @IsString()
  @IsOptional()
  title?: string;

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
