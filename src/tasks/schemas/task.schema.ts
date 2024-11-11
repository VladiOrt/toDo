import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type TaskDocument = Task & Document;

@Schema()
export class Task {
    @Prop({ required: true })
    userId: string;

    @Prop({ required: true })
    title: string;

    @Prop()
    description: string;

    @Prop({ required: true })
    deadLine: Date;

    @Prop({ enum: ['PENDIENTE', 'EN PROGRESO' , 'COMPLETADO' ], default:'PENDIENTE' })
    status: string;
}


export const TaskSchema = SchemaFactory.createForClass( Task );
