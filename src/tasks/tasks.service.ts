import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { createTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
      return this.tasks;
    }

    //aqui, basicamente passamos um id para a arrow function procurar
    //lembra muito a pesauisa do mongo pelo ".find"
    getTaskById(id: string): Task{
      return this.tasks.find((task) => task.id === id);
    }

    createTask(createTaskDto: createTaskDto) : Task {
      const { title, description } = createTaskDto;

      const task : Task = {
        id: uuid(),
        title,
        description,
        //busca os status dentro do enum que criamos, restringe apenas à essas opções
        status: TaskStatus.OPEN
      };

      //dentro do create, adiciona ao array de tasks
      this.tasks.push(task);
      //retorna a task para o local que chama a função (possível exibição futura)
      return task;
    }

    deleteTask(id: string): void {
      this.tasks = this.tasks.filter((task) => task.id !== id);
    }

    updateTaskStatus(id: string, status: TaskStatus){
      const task = this.getTaskById(id);
      task.status = status;
      return task;
    }

}
