import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentsService } from '../../../../core/services/students.service';
import { ICourse, IStudent, IInscription } from '../../../../model/interfaces';
import { CoursesService } from '../../../../core/services/courses.service';
import { InscriptionsService } from '../../../../core/services/inscriptions.service';
import { generateRandomString } from '../../../../shared/utils';
import { AuthService } from '../../../../core/services/auth.service';

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
    private authService:AuthService,
  ){
    
  }
  ngOnInit(): void {
    this.loadStudent();
    this.loadCoursesList();
    this.loadStudentInscriptions();
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

  loadStudentInscriptions(){
    this.isLoadingInscriptions=true;
    this.inscriptionsService.getInscriptionByStudent(this.activatedRoute.snapshot.params['id']).subscribe({
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

  onDelete(idInscription:string):void{

    console.log(idInscription)
    this.inscriptionsService.removeInscriptionById(idInscription).subscribe({
       next:()=>{
          this.loadStudentInscriptions();
      }
    });
    
  }
  onSave():void{
     if (!!this.courseToApply){
      // TODO: permite agregar repetidos
      
      let newInscrip:IInscription={   id: '',
          courseId:this.courseToApply!.id,
          studentId:this.student!.id,
          userId:this.authService.user.id,
          createdAt: new Date()
        }

      this.inscriptionsService.insertInscription(newInscrip).subscribe({
        next:()=>{
          this.loadStudentInscriptions();
          this.courseToApply=undefined;
        }
      });
    }
  }

}
