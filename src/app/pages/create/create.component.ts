import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable,  Subscription } from 'rxjs';
import { IPerson } from 'src/app/common/interfaces/person';
import { ITodo } from 'src/app/common/interfaces/todo';
import { PersonService } from 'src/app/common/services/person.service';
import { TodoService } from 'src/app/common/services/todo.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit, OnDestroy {
  subscription: Subscription | undefined

  get getDescription(){
    return this.form.get('description')
  }

  get getTitle(){
    return this.form.get('title')
  }

  get getDeadline(){
    return this.form.get('dueDate')
  }

  get getResponsiblePersonId(){
    return this.form.get('responsiblePersonId')
  }

  form: FormGroup = new FormGroup({
    title: new FormControl('',Validators.required),
    description: new FormControl('',Validators.required),
    dueDate: new FormControl('', Validators.required),
    responsiblePersonId: new FormControl('', Validators.required)
  })

  persons: IPerson[]= []

  todoId: string | undefined

  constructor(
    private personService: PersonService,
    private todoService: TodoService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getPersons()
    
    this.route.params.subscribe((params: Params)=>{
      
      if(params['id']){
        console.log(params)
        this.getTodoById(params['id'])
      }
    })
  }

  getTodoById(id: string){
    this.subscription = this.todoService.getTodoById(id)
    .subscribe((res: ITodo | undefined) => {
      if(res){
      this.form.patchValue(res)
      }
    })

  }

  getPersons(){
    this.subscription = this.personService.getPersons()
    .subscribe((res: IPerson[]) => {
      this.persons = res

    })

  }

  submit(){
    this.form.markAllAsTouched()
    if(this.form.invalid) return
    const {responsiblePersonId} = this.form.value
    let responsiblePerson: IPerson | undefined
    if(responsiblePersonId){
      responsiblePerson = this.persons.find(person => person.id === +responsiblePersonId)
    }

    if(this.todoId){
      this.subscription = this.todoService.updateTodoById(this.todoId,{
        ...this.form.value,
        responsiblePerson: responsiblePerson
      })

      .subscribe(()=>{
        this.router.navigate(['/'])
      })
    }else{
      this.subscription = this.todoService.addTodo({
        ...this.form.value,
        responsiblePerson: responsiblePerson
      })
      .subscribe(()=>{
        this.router.navigate(['/'])
      })
    }

    }
   

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }
}
