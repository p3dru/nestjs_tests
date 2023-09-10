import { Controller, Get, Post, Body, Param, Delete, Patch, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { createTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
    constructor (private tasksService: TasksService){}

    @Get()
    getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
        if (Object.keys(filterDto).length){
            return this.tasksService.getTasksWithFilters(filterDto);
        } else {
            return this.tasksService.getAllTasks();
        }
    }

    //aqui passamos um id para a rota get
    @Get('/:id')
    //com @Param, verificamos o id passado e enviamos esse mesmo id como string para a
    //getTaskById de tasksService
    getTaskById(@Param('id') id: string): Task{
      return this.tasksService.getTaskById(id);
    }

    @Post()
    //aqui ele recebe os atributos a partir do @Body() no formato createTaskDto passando como tipo,
    //o próprio createTaskDto para que possa ser formatado no tipo Task, enviando os dados para
    //tasksService,createTask passando createTaskDto 
    createTask(@Body() createTaskDto : createTaskDto): Task {
      return this.tasksService.createTask(createTaskDto);
    }
      //aqui é como se fosse os params do express, ele pega os valores passados pela requisição quem vem de um form
      //e passa esses dados para o service tratar.
      //createTask é apenas uma forma de chamar o tasks.services.createTask passando os valores
      /*
    ): Task {
      return this.tasksService.createTask(title, description);
    }
    */

    @Delete('/:id')
    deleteTask(@Param('id') id: string) : void{
      return this.tasksService.deleteTask(id);
    }

    @Patch('/:id/status')
    updateTaskStatus(
      @Param('id') id: string,
      @Body('status') status: TaskStatus,
    ) : Task {
      return this.tasksService.updateTaskStatus(id, status);
    }
}