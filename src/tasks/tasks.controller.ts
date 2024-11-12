import { Controller, Body, Req, Param, Post , Get, Put, Delete, UseGuards} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'supertest';

@Controller('api/tasks')
export class TasksController {    
    constructor(private readonly taskService:TasksService){}

    @UseGuards(JwtAuthGuard)
    @Post('/')
    async createTask(
        @Body() createTaskDto: CreateTaskDto, 
        @Req() req:Request 
    ){
        try{ 
            const  userId= (req['user']).userId;        
            const resultTask = await this.taskService.create({...createTaskDto, userId});
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
    async findTasks(@Req() req:Request) {
        const  userId= (req['user']).userId;
        return this.taskService.findAllByUser(userId);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string,  @Req() req:Request ){
        const  userId= (req['user']).userId;
        return this.taskService.findOneByUser( id,userId );
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    update(@Param('id') id:string, @Body() updateTaskDto: UpdateTaskDto) {
        return this.taskService.update( id,updateTaskDto );
    }
    
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string, @Req() req:Request) {
        const  userId= (req['user']).userId;
        return this.taskService.delete( id,userId );
    }

}
