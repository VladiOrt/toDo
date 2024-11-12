import { Controller, Body, Req, Param, Post , Get, Put, Delete, UseGuards} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'supertest';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { 
    exampleResponseCreate, 
    exampleResponseDelete ,
    exampleResponseGetAll,
    exampleResponseGetOne,
    exampleResponseUpdate
} from 'src/utils/response-example';

@ApiTags('Tareas')
@Controller('api/tasks')
export class TasksController {    
    constructor(private readonly taskService:TasksService){}

    @UseGuards(JwtAuthGuard)
    @Post('/')
    @ApiOperation({summary: 'Create Task'})
    @ApiResponse({ status: 200, description: JSON.stringify(exampleResponseCreate) })
    @ApiResponse({ status: 401, description: 'Ocurrio un error al Crear una tarea' })   
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
    @ApiOperation({summary: 'Get Tasks'})
    @ApiResponse({ status: 200, description: JSON.stringify(exampleResponseGetAll) })
    @ApiResponse({ status: 401, description: 'Ocurrio un error al Crear una tarea' })   
    async findTasks(@Req() req:Request) {
        const  userId= (req['user']).userId;
        return this.taskService.findAllByUser(userId);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    @ApiOperation({summary: 'Get Task By Id'})
    @ApiResponse({ status: 200, description: JSON.stringify(exampleResponseGetOne) })
    @ApiResponse({ status: 401, description: 'Tarea con ID "id" no encontrado' })   
    findOne(@Param('id') id: string,  @Req() req:Request ){
        const  userId= (req['user']).userId;
        return this.taskService.findOneByUser( id,userId );
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    @ApiOperation({summary: 'Update Task'})
    @ApiResponse({ status: 200, description: JSON.stringify(exampleResponseUpdate) })
    @ApiResponse({ status: 401, description: 'Tarea con ID "id" no encontrado' })   
    update(@Param('id') id:string, @Body() updateTaskDto: UpdateTaskDto) {
        return this.taskService.update( id,updateTaskDto );
    }
    
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @ApiOperation({summary: 'Delete Task'})
    @ApiResponse({ status: 200, description: JSON.stringify(exampleResponseDelete) })
    @ApiResponse({ status: 401, description: 'Tarea con ID "id" no encontrado' })   
    remove(@Param('id') id: string, @Req() req:Request) {
        const  userId= (req['user']).userId;
        return this.taskService.delete( id,userId );
    }

}
