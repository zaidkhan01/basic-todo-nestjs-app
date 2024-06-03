import { Todo } from '../entities/todo.entity';



import { Injectable } from '@nestjs/common';
import {  Repository } from 'typeorm';


@Injectable()
export class TodoRepository extends Repository<Todo> {}
