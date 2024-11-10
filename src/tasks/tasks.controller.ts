import { Controller, Body, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('api/tasks')
export class TasksController {
    constructor(private readonly taskService:TasksService){}

    @Post('/')
    async createTask(@Body() createTaskDto: CreateTaskDto){
        try{        
            const resultTask = await this.taskService.create(createTaskDto);

            return {
                ok: true,
                msg: 'Tarea creada con exíto',
                data: 'data'
            }
        }catch(error){
            return { 
                ok: false,
                msg: 'Ocurrio un error al Crear una tarea',
                data: error
            }
        };
    }

}
