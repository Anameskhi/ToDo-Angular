import { Injectable } from '@angular/core';
import {ITodo} from "../interfaces/todo";
import {BehaviorSubject, map, Observable, of} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todos$: BehaviorSubject<ITodo[]> = new BehaviorSubject<ITodo[]>([])

  getTodos(): Observable<ITodo[]> {
    return this.todos$.asObservable();
  }

  getTodoById(id: string | number): Observable<ITodo | undefined> {
    return this.todos$.pipe(
      map((todos) => {
        return todos.find(todo => todo.id === id);
      })
    );
  }

  addTodo(todo: ITodo): Observable<ITodo> {
    console.log(todo);
    todo.id = this.generateId();
    todo.status = 'active';
    todo.createdAt = new Date();
    this.todos$.next([
      ...this.todos$.getValue(),
      todo
    ]);
    return of(todo);
  }


  updateTodoById(id: string | number, todo: ITodo): Observable<ITodo> {

    const todos = this.todos$.getValue();
    const index = todos.findIndex(todo => todo.id === id);
    todo.status = 'active';
    todos[index] = {
      ...todos[index],
      ...todo
    }
    this.todos$.next(todos);
    return of(todo);
  }

  deleteTodoById(id: string | number): Observable<boolean> {
    const todos = this.todos$.getValue();
    const index = todos.findIndex(todo => todo.id === id);
    todos.splice(index, 1);
    this.todos$.next(todos);
    return of(true);
  }

  completeTodoById(id: string | number): Observable<ITodo> {
    const todos = this.todos$.getValue();
    const index = todos.findIndex(todo => todo.id === id);
    todos[index] = {
      ...todos[index],
      status: 'completed'
    };
    this.todos$.next(todos);
    return of(todos[index]);
  }

  generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}