import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type TaskDocument = Task & Document;

@Schema()
export class Task {
    @Prop({ required: true })
    title: string;

    @Prop()
    description: string;

    @Prop({ required: true })
    dueDate: Date;

    @Prop({ enum: ['Pendiente', 'En progreso' , 'Completado' ], default:'Pendiente' })
    status: string;
}


export const TaskSchema = SchemaFactory.createForClass( Task );
