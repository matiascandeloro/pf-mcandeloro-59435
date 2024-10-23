import { Component } from '@angular/core';
import { IStudent } from '../../../model/interfaces';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../../../core/services/alert.service';
import { StudentsService } from '../../../core/services/students.service';
import { StudentDialogComponent } from './student-dialog/student-dialog.component';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrl: './student.component.scss'
})
export class StudentComponent {
  displayedColumns: string[] = ['id', 'name', 'email','createdAt','actions'];
  dataSource: IStudent[]=[];
  isLoading=false;
  constructor(
    private matDialog:MatDialog,
    private studentsService:StudentsService,
    public alertService:AlertService,
    private router:Router,
    private activatedRoute:ActivatedRoute,)
  { }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents():void{
    this.isLoading=true;
     this.studentsService.getStudents().subscribe({
      next:(student)=>{
        this.dataSource=student;
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
       this.studentsService.removeStudentById(id).subscribe({
        next: (student)=>{
          this.dataSource=student;
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

  openModal(editingStudent?:IStudent):void{
    this.matDialog.open(StudentDialogComponent,{
      data:{
        editingStudent
      }
    })
      .afterClosed()
      .subscribe({
        next:(result)=>{
          if (!!result){
            if (editingStudent){
              this.handleUpdate(editingStudent.id,result);
            }else{
              this.handleInsert(result);
            }

          }
        }
      });
  }

  handleUpdate(id: string, update:IStudent):void{
    this.isLoading=true;
    this.studentsService.updateStudentById(id,update).subscribe({
      next:(student)=>{
        this.dataSource=student;
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

  handleInsert(insert:IStudent):void{
    this.isLoading=true;
    this.studentsService.insertStudent(insert).subscribe({
      next:(student)=>{
        this.dataSource=student;
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
