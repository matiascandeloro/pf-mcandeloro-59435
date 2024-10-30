import { Injectable } from '@angular/core';
import { IInscription, IStudent } from '../../model/interfaces';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { map } from 'rxjs/internal/operators/map';

let MY_INSCRIPTION_DB: IInscription[] = [
  {id: 'DjEc', 
    course: {id: 'VaCf', name: 'Curso 1',   description: 'Descripcion del curso 1', active:true, createdAt: new Date()},    
    student: {id: 'CpET', firstName: 'Matias',    lastName: 'Candeloro', email:'mcandeloro@gmail.com', createdAt: new Date()}, 
    user:{id: 'VaCp', firstName: 'Matias',    lastName: 'Candeloro', email:'mcandeloro@gmail.com', password:'123456',createdAt: new Date(),role:'ADMIN', token:'sa5835Rs5835y6VxAbf5'}, 
    createdAt: new Date()},
  {id: 'Kelw', 
    course: {id: 'Xx7s', name: 'Curso 2',   description: 'Descripcion del curso 2', active:true, createdAt: new Date()},   
    student: {id: 'CpET', firstName: 'Matias',    lastName: 'Candeloro', email:'mcandeloro@gmail.com', createdAt: new Date()}, 
    user:{id: 'EToz', firstName: 'Gustavo',   lastName: 'Fernandez', email:'gfernandez@gmail.com', password:'123456',createdAt: new Date(),role:'ADMIN', token:'sa5835Rs5835y6VxAbf5'},
    createdAt: new Date()},
  {
    course: {id: 'VaCf', name: 'Curso 1',   description: 'Descripcion del curso 1', active:true, createdAt: new Date()},    
    student: {id: '8b7B', firstName: 'Ignacio',   lastName: 'Conti',     email:'iconti@gmail.com',     createdAt: new Date()}, 
    id: '7sks', 
    createdAt: new Date(),
    user:{id: 'VaCp', firstName: 'Matias',    lastName: 'Candeloro', email:'mcandeloro@gmail.com', password:'123456',createdAt: new Date(),role:'ADMIN', token:'sa5835Rs5835y6VxAbf5'},
  }
];


@Injectable({
  providedIn: 'root'
})
export class InscriptionsService {
  db_inscription_filter: IInscription[] =[];
  constructor() { }
  getInscription():Observable<IInscription[]>{
    return of(MY_INSCRIPTION_DB);
  }


  updateInscriptionById(id:string,update:Partial<IInscription>){
    MY_INSCRIPTION_DB=MY_INSCRIPTION_DB.map((inscription)=>inscription.id===id? {...inscription,...update}:inscription);
    return of(MY_INSCRIPTION_DB);
  }

  removeInscriptionById(id: string ):Observable<IInscription[]>{
    MY_INSCRIPTION_DB=MY_INSCRIPTION_DB.filter((inscription)=> inscription.id!=id);
    return of(MY_INSCRIPTION_DB);
  }
  
  removeInscriptionByStudentCourse(idStudent?: string, idCourse?: string ):Observable<IInscription[]>{
    console.log(MY_INSCRIPTION_DB, idStudent, idCourse);
    MY_INSCRIPTION_DB=MY_INSCRIPTION_DB.filter((inscription)=> inscription.course.id!=idCourse || inscription.student.id!=idStudent);
    console.log(MY_INSCRIPTION_DB);
    return of(MY_INSCRIPTION_DB);
  }

  insertInscription(inscription:IInscription){
    MY_INSCRIPTION_DB= [...MY_INSCRIPTION_DB,{...inscription,}];
    return of(MY_INSCRIPTION_DB);
  }

  getInscriptionById(id:string): Observable<IInscription| undefined>{
    return this.getInscription().pipe(map((inscription)=> inscription.find((i)=> i.id===id)));

  }
  getInscriptionByStudent(idStudent?:string ): Observable<IInscription[]>{
    this.db_inscription_filter=MY_INSCRIPTION_DB.filter((inscription)=> inscription.student.id===idStudent);
    return of(this.db_inscription_filter);
  }
  getInscriptionByCourse(idCourse?:string): Observable<IInscription[]>{
    this.db_inscription_filter=MY_INSCRIPTION_DB.filter((inscription)=> inscription.course.id===idCourse);
    return of(this.db_inscription_filter);
  }


}