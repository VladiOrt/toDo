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

    async findAllByUser(userId): Promise<Task[]>{
        return this.taskModel.find({ userId }).lean().exec();
    }
        
    async findOneByUser(id: string, userId: string): Promise<Task>{
        const task = await this.taskModel.findOne({_id: id, userId }).exec();

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

    async delete(id: string, userId: string): Promise<void> {
        const result = await this.taskModel.findByIdAndDelete({_id: id , userId}).exec();
        if(!result){
            throw new NotFoundException(`Tarea con ID "${id}" no encontrado`)
        }
    }
}
