import { Injectable } from '@angular/core';
import { ICourse, User } from '../../model/interfaces';
import { delay, Observable, of } from 'rxjs';

let MY_COURSE_DB: ICourse[] = [
  {id: 'VaCf', name: 'Curso 1',   description: 'Descripcion del curso 1', active:true, createdAt: new Date()},
  {id: 'Xx7s', name: 'Curso 2',   description: 'Descripcion del curso 2', active:true, createdAt: new Date()},
  {id: 'kskj', name: 'Curso 3',   description: 'Descripcion del curso 3', active:true, createdAt: new Date()},
  {id: 'w7yB', name: 'Curso 4',   description: 'Descripcion del curso 4', active:true, createdAt: new Date()},
];

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor() { }

  getCourses(): ICourse[]{
    return MY_COURSE_DB;
  }


  updateCourseById(id:string,update:Partial<ICourse>){
    MY_COURSE_DB=MY_COURSE_DB.map((course)=>course.id===id? {...course,...update}:course);
    return of(MY_COURSE_DB);
  }

  removeCourseById(id: string ):Observable<ICourse[]>{
    MY_COURSE_DB=MY_COURSE_DB.filter((course)=> course.id!=id);

    return of(MY_COURSE_DB);
  }

  insertCourse(course:ICourse){
    MY_COURSE_DB= [...MY_COURSE_DB,{...course,}];
    return of(MY_COURSE_DB);
  }
}
