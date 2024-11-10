import { Controller, Body, Param, Post , Get, Put, Delete} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

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
                data: resultTask
            }
        }catch(error){
            return { 
                ok: false,
                msg: 'Ocurrio un error al Crear una tarea',
                data: error
            }
        };
    }

    @Get('/')
    async findTasks() {
        return this.taskService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        return this.taskService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id:string, @Body() updateTaskDto: UpdateTaskDto) {
        return this.taskService.update(id, updateTaskDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.taskService.delete(id);
    }

}
