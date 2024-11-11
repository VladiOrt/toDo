import { Controller, Body, Param, Post , Get, Put, Delete, UseGuards} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('api/tasks')
export class TasksController {    
    constructor(private readonly taskService:TasksService){}
    @UseGuards(JwtAuthGuard)
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

    @UseGuards(JwtAuthGuard)
    @Get('/')
    async findTasks() {
        return this.taskService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string){
        return this.taskService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    update(@Param('id') id:string, @Body() updateTaskDto: UpdateTaskDto) {
        return this.taskService.update(id, updateTaskDto);
    }
    
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.taskService.delete(id);
    }

}
