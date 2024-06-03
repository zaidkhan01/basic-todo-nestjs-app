// import { Injectable } from '@nestjs/common';
// import { CreateTodoDto } from './dto/create-todo.dto';
// import { UpdateTodoDto } from './dto/update-todo.dto';
// import { TodoRepository } from './repo/todo.repository';
// import { Todo } from './entities/todo.entity';
// import { UserService } from 'src/user/user.service';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { User } from 'src/user/entities/user.entity';


// @Injectable()
// export class TodoService {
//   constructor(
//     @InjectRepository(Todo)
//     private readonly todoRepository: Repository<Todo>, // Corrected placement of @InjectRepository
//     private readonly userService: UserService, // Added 'private' keyword
//   ) {}


//   async create(createTodoDto: CreateTodoDto , userId:number) {
//     let todo:Todo=new Todo();
    
//     todo.title=createTodoDto.title;
//     todo.date=new Date().toLocaleString()
//      todo.completed=false;
//      todo.user= await this.userService.findUserById(userId)
//     return this.todoRepository.save(todo);
//   }

//   findAllByUserNotCompleted(userId:number) {
//     return this.todoRepository.find({
//       relations:['user'],
//       where:{user:{id:userId},completed:false},
//     });
//   }

//   findAllByUserCompleted(userId:number) {
//     return this.todoRepository.find({
//       relations:['user'],
//       where:{user:{id:userId},completed:true},
//     });
//   }

//   findOne(id: number) {
//     return `This action returns a #${id} todo`;
//   }

//   update(id: number, updateTodoDto: UpdateTodoDto) {
//     return `This action updates a #${id} todo`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} todo`;
//   }
// }


import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoRepository } from './repo/todo.repository';
import { Todo } from './entities/todo.entity';
import { UserService } from 'src/user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// ADD TODO BASED ON USER ID
// FIND ALL TODOS BASED ON USER ID (NOT COMPLETED)
// FIND ALL COMPLETED TODOS BASED ON USER ID (COMPLETED)
// MARK TODO AS COMPLETED BASED ON TODO ID
// DELETE TODO  BASED ON TODO ID

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
    private userService: UserService,
  ) {}

  async create(createTodoDto: CreateTodoDto, userId: number) {
    let todo: Todo = new Todo();
    todo.title = createTodoDto.title;
    todo.date = new Date().toLocaleString();
    todo.completed = false;
    todo.user = await this.userService.findUserById(userId);
    return this.todoRepository.save(todo);
  }

  findAllTodoByUserNotCompleted(userId: number) {
    // userid not completed
    return this.todoRepository.find({
      relations: ['user'],
      where: { user: { id: userId }, completed: false },
    });
  }

  findAllTodoByUserCompleted(userId: number) {
    // userid not completed
    return this.todoRepository.find({
      relations: ['user'],
      where: { user: { id: userId }, completed: true },
    });
  }

  update(todoId: number) {
    return this.todoRepository.update(todoId, { completed: true });
  }

  remove(todoId: number) {
    return this.todoRepository.delete(todoId);
  }
}
