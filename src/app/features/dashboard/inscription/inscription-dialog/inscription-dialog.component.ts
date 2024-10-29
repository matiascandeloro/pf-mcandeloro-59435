import { Component, Inject, OnInit } from '@angular/core';
import { ICourse, IInscription, IStudent } from '../../../../model/interfaces';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { generateRandomString } from '../../../../shared/utils';
import { StudentsService } from '../../../../core/services/students.service';
import { CoursesService } from '../../../../core/services/courses.service';

interface CourseDialogData{
  editingInscription?: IInscription;
}

@Component({
  selector: 'app-inscription-dialog',
  templateUrl: './inscription-dialog.component.html',
  styleUrl: './inscription-dialog.component.scss'
})
export class InscriptionDialogComponent implements OnInit{
  userForm:FormGroup; 
  isLoadingCourse=false;
  isLoadingStudent=false;
  courseList: ICourse[]=[];
  studentList: IStudent[]=[];

  constructor(
    private matDialogRef:MatDialogRef<InscriptionDialogComponent>,
    private formBuilder: FormBuilder,
    private courseService: CoursesService,
    private studentService:StudentsService,
    @Inject(MAT_DIALOG_DATA) public data?: CourseDialogData,
  ){
    this.userForm=this.formBuilder.group({
      course:[null,[Validators.required]],
      student:[null,[Validators.required]],
    });
    this.loadStudentsAndCourses();
    this.patchFormValue();
  }
  ngOnInit(): void {
  }

  loadStudentsAndCourses():void{
    this.isLoadingCourse=true;
    this.isLoadingStudent=true;
    this.courseService.getCourses().subscribe({
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
    this.studentService.getStudents().subscribe({
      next:(student)=>{
        this.studentList=student;
        this.isLoadingStudent=false;
      },
      error:()=>{
        this.isLoadingStudent=false;
      },
      complete:()=>{
        this.isLoadingStudent=false;
      }
    })
  }

  private get isEditing(){
    return !!this.data?.editingInscription;
  }

  patchFormValue(){
    if (this.data?.editingInscription){
      const course= this.courseList.find(c=>c.id===this.data?.editingInscription?.course.id);
      const student= this.studentList.find(s=>s.id===this.data?.editingInscription?.student.id);
      this.userForm.patchValue({...this.data.editingInscription,course,student});
    }
  }

  onSave():void{
    console.log(this.userForm);
    if (this.userForm.invalid){
      this.userForm.markAllAsTouched();
    }else{
      this.matDialogRef.close({
          ...this.userForm.value,
          id: this.isEditing ? this.data!.editingInscription!.id : generateRandomString(4),
          createdAt: this.isEditing ? this.data!.editingInscription!.createdAt : new Date(),
          /**  cambiar luego por el usuario logueado */
          user: this.isEditing ? this.data!.editingInscription!.user: {id: 'VaCp', firstName: 'Matias',    lastName: 'Candeloro', email:'mcandeloro@gmail.com', password:'123456',createdAt: new Date(),rol:'ADMIN'},
      });
    }
  }
}
