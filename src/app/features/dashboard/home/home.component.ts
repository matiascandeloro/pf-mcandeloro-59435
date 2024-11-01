import { Component } from '@angular/core';
import { CoursesService } from '../../../core/services/courses.service';
import { StudentsService } from '../../../core/services/students.service';
import { InscriptionsService } from '../../../core/services/inscriptions.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  cantStudents:number=0;
  cantCourses:number=0;
  cantInscriptions:number=0;

  constructor(
    private coursesService:CoursesService,
    private studentsService:StudentsService,
    private inscriptionsService:InscriptionsService
  ){
    this.coursesService.getCourses().subscribe({
      next:(courses)=>this.cantCourses=courses.length
    });
    this.studentsService.getStudents().subscribe({
      next:(students)=>this.cantStudents=students.length
    });
    this.inscriptionsService.getInscriptions().subscribe({
      next:(inscriptions)=>this.cantInscriptions=inscriptions.length
    });
    
  }
}
