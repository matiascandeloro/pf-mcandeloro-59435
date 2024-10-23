import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentsService } from '../../../../core/services/students.service';
import { ICourse, IStudent, IInscription } from '../../../../model/interfaces';
import { CoursesService } from '../../../../core/services/courses.service';
import { InscriptionsService } from '../../../../core/services/inscriptions.service';
import { generateRandomString } from '../../../../shared/utils';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrl: './student-detail.component.scss'
})
export class StudentDetailComponent implements OnInit{
  isLoading=false;
  isLoadingCourse=false;
  isLoadingInscriptions=false;
  idUsuario?: string;

  student?:IStudent;
  courseList: ICourse[]=[];
  courseToApply?:ICourse;
  inscriptions?: IInscription[]=[]; 
  displayedColumns: string[] = ['name', 'description','actions'];
  dataSource: IInscription[]=[];
  

  constructor(
    private activatedRoute:ActivatedRoute, 
    private studentsService:StudentsService,
    private coursesService:CoursesService,
    private inscriptionsService: InscriptionsService,
  ){
    
  }
  ngOnInit(): void {
    this.loadStudent();
    this.loadCoursesList();
    this.loadStudentInscriptions(this.student?.id);
  }

  loadStudent():void{
    this.isLoading=true;
    this.studentsService.getStudentById(this.activatedRoute.snapshot.params['id']).subscribe({
      next: (student)=>{
        this.student=student;
        this.isLoading=false;
      },
      error:()=>{
        this.isLoading=false;
      },
      complete:()=>{
        this.isLoading=false;
      }
    });
  }

  loadCoursesList():void{
    this.isLoadingCourse=true;
    this.coursesService.getCourses().subscribe({
      next:(course)=>{
        this.courseList=course;
        this.isLoadingCourse=false;
      },
      error:()=>{
        this.isLoadingCourse=false;
      },
      complete:()=>{
        this.isLoadingCourse=false;
      },
    })
  }

  loadStudentInscriptions(idStudent:string | undefined){
    this.isLoadingInscriptions=true;
    this.inscriptionsService.getInscriptionByStudent(this.student?.id).subscribe({
      next:(inscriptions)=>{
        this.dataSource=inscriptions;
        this.isLoadingInscriptions=false;
      },
      error:()=>{
        this.isLoadingInscriptions=false;
      },
      complete:()=>{
        this.isLoadingInscriptions=false;
      },
    })
  }

  onDelete(idCourse:string):void{
    this.inscriptionsService.removeInscriptionByStudentCourse(this.student?.id,idCourse);
    this.loadStudentInscriptions(this.student?.id);
  }
  onSave():void{
    
    let newInscrip:IInscription={   id: generateRandomString(4),
      course:this.courseToApply!,
      student:this.student!,
      /** TODO: cambiar por objeto de usuario logueado */
      user:{id: 'CpET', firstName: 'Matias',    lastName: 'Candeloro', email:'mcandeloro@gmail.com', createdAt: new Date(), rol:'ADMIN', password:'123456'},
      createdAt: new Date()
    }

    this.inscriptionsService.insertInscription(newInscrip);
    this.loadStudentInscriptions(this.student?.id);
  }

}
