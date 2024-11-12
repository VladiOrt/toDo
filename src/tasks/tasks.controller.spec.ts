import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateTaskDto, statusTask } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  beforeEach(async () => {
    const mockTasksService = {
      create: jest.fn().mockResolvedValue({ id: '1', title: 'Test Task', userId: '123' }),
      findAllByUser: jest.fn().mockResolvedValue([{ id: '1', title: 'Test Task', userId: '123' }]),
      findOneByUser: jest.fn().mockResolvedValue({ id: '1', title: 'Test Task', userId: '123' }),
      update: jest.fn().mockResolvedValue({ id: '1', title: 'Updated Task', userId: '123' }),
      delete: jest.fn().mockResolvedValue({ deleted: true }),
    };

    const mockJwtAuthGuard = {
      canActivate: jest.fn(() => true),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: mockTasksService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(mockJwtAuthGuard)
      .compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  it('debería estar definido', () => {
    expect(controller).toBeDefined();
  });

  describe('createTask', () => {
    it('debería crear una nueva tarea', async () => {
      const createTaskDto: CreateTaskDto = { title: 'New Task', description: 'Test description', status:statusTask.COMPLETED };
      const req = { user: { userId: '123' } };
      
      const result = await controller.createTask(createTaskDto, req as any);
      expect(result).toEqual({
        ok: true,
        msg: 'Tarea creada con exíto',
        data: { id: '1', title: 'Test Task', userId: '123' },
      });
      expect(service.create).toHaveBeenCalledWith({ ...createTaskDto, userId: '123' });
    });
  });

  describe('findTasks', () => {
    it('debería retornar una lista de tareas', async () => {
      const req = { user: { userId: '123' } };
      const result = await controller.findTasks(req as any);
      expect(result).toEqual([{ id: '1', title: 'Test Task', userId: '123' }]);
      expect(service.findAllByUser).toHaveBeenCalledWith('123');
    });
  });

  describe('findOne', () => {
    it('debería retornar una tarea por ID', async () => {
      const req = { user: { userId: '123' } };
      const result = await controller.findOne('1', req as any);
      expect(result).toEqual({ id: '1', title: 'Test Task', userId: '123' });
      expect(service.findOneByUser).toHaveBeenCalledWith('1', '123');
    });
  });

  describe('update', () => {
    it('debería actualizar una tarea', async () => {
      const updateTaskDto: UpdateTaskDto = { title: 'Updated Task' };
      const result = await controller.update('1', updateTaskDto);
      expect(result).toEqual({ id: '1', title: 'Updated Task', userId: '123' });
      expect(service.update).toHaveBeenCalledWith('1', updateTaskDto);
    });
  });

  describe('remove', () => {
    it('debería eliminar una tarea', async () => {
      const req = { user: { userId: '123' } };
      const result = await controller.remove('1', req as any);
      expect(result).toEqual({ deleted: true });
      expect(service.delete).toHaveBeenCalledWith('1', '123');
    });
  });
});
