import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';

@Entity()
export class Task {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  deadLine: Date;

  @Column({ default: 'Pendiente' })
  status: 'Pendiente' | 'En progreso' | 'Completado';
}