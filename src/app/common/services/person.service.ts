import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { persons } from 'src/app/shared/datas/persons';
import { IPerson } from '../interfaces/person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor() { }

  getPersons(id: string | number): Observable<IPerson[]>{
    return of(persons)
  }
  getPerson(id: string | number): Observable<IPerson | undefined>{
    return of(persons.find(person => person.id === id))
  }
}
