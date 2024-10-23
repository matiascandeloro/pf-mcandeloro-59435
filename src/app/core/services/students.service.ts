import { Injectable } from '@angular/core';
import { IStudent } from '../../model/interfaces';
import { of } from 'rxjs/internal/observable/of';
import { Observable } from 'rxjs/internal/Observable';
import { delay } from 'rxjs/internal/operators/delay';
import { map } from 'rxjs/internal/operators/map';

let MY_STUDENT_DB: IStudent[] = [
  {id: 'CpET', firstName: 'Matias',    lastName: 'Candeloro', email:'mcandeloro@gmail.com', createdAt: new Date()},
  {id: 'XmVa', firstName: 'Agustin',   lastName: 'Lopez',     email:'alopez@gmail.com',     createdAt: new Date()},
  {id: '7sks', firstName: 'Nahuel',    lastName: 'Ortiz',     email:'nortiz@gmail.com',     createdAt: new Date()},
  {id: 'Rjw7', firstName: 'Sergio',    lastName: 'Juarez',    email:'sjuarez@gmail.com',    createdAt: new Date()},
  {id: 'cBvj', firstName: 'Leonardo',  lastName: 'Hernandez', email:'lhernandez@gmail.com', createdAt: new Date()},
  {id: 'PTLm', firstName: 'Gustavo',   lastName: 'Fernandez', email:'gfernandez@gmail.com', createdAt: new Date()},
  {id: 'ozvS', firstName: 'Francisco', lastName: 'Gutierrez', email:'fgutierrez@gmail.com', createdAt: new Date()},
  {id: 'KXFd', firstName: 'Tomas',     lastName: 'Arevalo',   email:'tarevalo@gmail.com',   createdAt: new Date()},
  {id: '8b7B', firstName: 'Ignacio',   lastName: 'Conti',     email:'iconti@gmail.com',     createdAt: new Date()},
  {id: 'QTCG', firstName: 'David',     lastName: 'Gomez',     email:'dgomez@gmail.com',     createdAt: new Date()},
];



@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor() { }
  getStudents():Observable<IStudent[]>{
    return of(MY_STUDENT_DB).pipe(delay(1000));
  }


  updateStudentById(id:string,update:Partial<IStudent>){
    MY_STUDENT_DB=MY_STUDENT_DB.map((student)=>student.id===id? {...student,...update}:student);
    return of(MY_STUDENT_DB).pipe(delay(500));
  }

  removeStudentById(id: string ):Observable<IStudent[]>{
    MY_STUDENT_DB=MY_STUDENT_DB.filter((student)=> student.id!=id);

    return of(MY_STUDENT_DB).pipe(delay(500));
  }

  insertStudent(student:IStudent){
    MY_STUDENT_DB= [...MY_STUDENT_DB,{...student,}];
    return of(MY_STUDENT_DB).pipe(delay(500));
  }

  getStudentById(id:string): Observable<IStudent| undefined>{
    return this.getStudents().pipe(map((student)=> student.find((s)=> s.id===id)));

  }
}

