import { Component, OnInit } from '@angular/core';
import { ITodo } from 'src/app/common/interfaces/todo';
import { TodoService } from 'src/app/common/services/todo.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  todos: ITodo[] = []

  constructor(
    private todoService: TodoService
  ) { }

  ngOnInit(): void {
    this.getTodos()
  }

  getTodos(){
    this.todoService.getTodos().subscribe((res)=>{
      this.todos = res
    })
  }

}
