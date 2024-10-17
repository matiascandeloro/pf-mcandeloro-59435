import { Injectable } from '@angular/core';
import { Course, User } from '../../model/interfaces';

const MY_COURSE_DB: Course[] = [
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

  getCourses(): Course[]{
    return MY_COURSE_DB;
  }
}
