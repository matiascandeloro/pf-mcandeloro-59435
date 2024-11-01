import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../../../core/services/courses.service';
import { InscriptionsService } from '../../../../core/services/inscriptions.service';
import { StudentsService } from '../../../../core/services/students.service';
import { IStudent, ICourse, IInscription } from '../../../../model/interfaces';
import { generateRandomString } from '../../../../shared/utils';
import { StudentComponent } from '../../student/student.component';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss'
})
export class CourseDetailComponent {
  isLoading=false;
  isLoadingStudent=false;
  isLoadingInscriptions=false;

  studentToApply?:IStudent;
  studentList: IStudent[]=[];
  course?:ICourse;
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
    this.loadStudentList();
    this.loadCoursesInscriptions();
  }

  loadStudent():void{
    this.isLoading=true;
    this.coursesService.getCourseById(this.activatedRoute.snapshot.params['id']).subscribe({
      next: (course)=>{
        this.course=course;
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

  loadStudentList():void{
    this.isLoadingStudent=true;
    this.studentsService.getStudents().subscribe({
      next:(student)=>{
        this.studentList=student;
        this.isLoadingStudent=false;
      },
      error:()=>{
        this.isLoadingStudent=false;
      },
      complete:()=>{
        this.isLoadingStudent=false;
      },
    })
  }

  loadCoursesInscriptions(){
    this.isLoadingInscriptions=true;
    this.inscriptionsService.getInscriptionByCourse(this.activatedRoute.snapshot.params['id']).subscribe({
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
    this.inscriptionsService.removeInscriptionById(idInscription).subscribe({
       next:()=>{
          this.loadCoursesInscriptions();
      }
    });
  }
  
  onSave():void{
     if (!!this.studentToApply){
      // TODO: permite agregar repetidos
      let newInscrip:IInscription={   id: '',
        courseId:this.course!.id,
        studentId:this.studentToApply!.id,
        /** TODO: cambiar por objeto de usuario logueado */
        userId:this.authService.user.id,
        createdAt: new Date()
      }

      this.inscriptionsService.insertInscription(newInscrip).subscribe({
        next:()=>{
          this.loadCoursesInscriptions();
          this.studentToApply=undefined;
        }
      });
    }
  }

}
