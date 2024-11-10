import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {

    constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

    async create( createTaskDto: CreateTaskDto ) : Promise<Task> {
        const newTask = new this.taskModel(createTaskDto);
        return newTask.save();
    } 

    async findAll(): Promise<Task[]>{
        return this.taskModel.find().exec();
    }
        
    async findOne(id: string): Promise<Task>{
        const task = await this.taskModel.findById(id).exec();

        if(!task){
            throw new NotFoundException(`Tarea con ID "${id}" no encontrado`);            
        }
        return task;
    }
     
    async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task>{
        const updateTask = await this.taskModel.findByIdAndUpdate(id, updateTaskDto, { new: true }).exec();

        if(!updateTask){
            throw new NotFoundException(`Tarea con el ID "${id}" no encontrada`)
        }
        return updateTask;
    }

    async delete(id: string): Promise<void> {
        const result = await this.taskModel.findByIdAndDelete(id).exec();
        if(!result){
            throw new NotFoundException(`Tarea con ID "${id}" no encontrado`)
        }
    }
}
