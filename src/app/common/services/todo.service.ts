import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ITodo } from '../interfaces/todo';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  get todos(): ITodo[]{
    return this.storageService.get('todos') || []
  }
  constructor(
    private storageService: StorageService
  ) { }

  getTodos(): Observable<ITodo[]>{
    return of(this.todos)
  }

  getTodoById(id: string | number): Observable<ITodo | undefined>{
    return of(this.todos.find(todo => todo.id === id))
  }

  addTodo(todo: ITodo): void {
    const todos = this.todos;
    todo.id = this.generateId();
    todo.status = 'pending';
    todo.createdAt = new Date();
    todos.push(todo);
    this.storageService.set('todos',todos)
  }
  
  updateTodoById(id: string | number, todo: ITodo): void{
    const todos = this.todos;
    const index = todos.findIndex(todo => todo.id === id);
    todos[index] = todo;
    this.storageService.set('todo', todos)
  }

  deleteTodoById(id: string | number): void{
    const todos = this.todos;
    const index = todos.findIndex(todo => todo.id === id);
    todos.splice(index, 1);
    this.storageService.set('todos', todos)
  }


  generateId(): number{
    return Math.random();
  }


}
