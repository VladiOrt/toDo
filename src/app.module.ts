import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule , ConfigService } from '@nestjs/config';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports : [ ConfigModule ],
      inject : [ ConfigService ],
      useFactory: ( ConfigService : ConfigService ) => ({
        type: 'mongodb',
        url: ConfigService.get<string>('MONGODB_URI'),
        useUnifiedTopology: true,
      })
    }),
    TasksModule,
  ]
})
export class AppModule {}
