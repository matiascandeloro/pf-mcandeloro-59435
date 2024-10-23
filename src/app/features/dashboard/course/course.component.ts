import { Component } from '@angular/core';
import { ICourse } from '../../../model/interfaces';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from '../../../core/services/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from '../../../core/services/courses.service';
import { CourseDialogComponent } from './course-dialog/course-dialog.component';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss'
})
export class CourseComponent {
  displayedColumns: string[] = ['id', 'name', 'description','createdAt','actions'];
  dataSource: ICourse[]=[];
  isLoading=false;
  constructor(
    private matDialog:MatDialog,
    private coursesService:CoursesService,
    public alertService:AlertService,
    private router:Router,
    private activatedRoute:ActivatedRoute,)
  { }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses():void{
    this.isLoading=true;
     this.coursesService.getCourses().subscribe({
      next:(course)=>{
        this.dataSource=course;
        this.isLoading=false;
      },
      error:()=>{
        this.isLoading=false;
      },
      complete:()=>{
        this.isLoading=false;
      },
     });
  }

  onDelete(id: string){
    if (confirm('Esta seguro de eliminar el registro?')){
      this.isLoading=true;
       this.coursesService.removeCourseById(id).subscribe({
        next: (course)=>{
          this.dataSource=course;
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
  }

  openModal(editingCourse?:ICourse):void{
    this.matDialog.open(CourseDialogComponent,{
      data:{
        editingCourse
      }
    })
      .afterClosed()
      .subscribe({
        next:(result)=>{
          if (!!result){
            if (editingCourse){
              this.handleUpdate(editingCourse.id,result);
            }else{
              this.handleInsert(result);
            }

          }
        }
      });
  }

  handleUpdate(id: string, update:ICourse):void{
    this.isLoading=true;
    this.coursesService.updateCourseById(id,update).subscribe({
      next:(course)=>{
        this.dataSource=course;
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

  handleInsert(insert:ICourse):void{
    this.isLoading=true;
    this.coursesService.insertCourse(insert).subscribe({
      next:(course)=>{
        this.dataSource=course;
        this.isLoading=false;
      },
      error:()=>{
        this.isLoading=false;
      },
      complete:()=>{
        this.isLoading=false;
      }
    })
  }
 

  goToDetail(id:string):void{
    this.router.navigate([id,'detail'],{relativeTo: this.activatedRoute})
  }

}
