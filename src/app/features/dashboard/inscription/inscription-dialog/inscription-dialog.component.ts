import { Component, Inject, OnInit } from '@angular/core';
import { ICourse, IInscription, IStudent } from '../../../../model/interfaces';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { generateRandomString } from '../../../../shared/utils';
import { StudentsService } from '../../../../core/services/students.service';
import { CoursesService } from '../../../../core/services/courses.service';
import { AuthService } from '../../../../core/services/auth.service';

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
  selectedCourse:ICourse|undefined;

  constructor(
    private matDialogRef:MatDialogRef<InscriptionDialogComponent>,
    private formBuilder: FormBuilder,
    private courseService: CoursesService,
    private studentService:StudentsService,
    private authService:AuthService,
    @Inject(MAT_DIALOG_DATA) public data?: CourseDialogData,
  ){
    this.userForm=this.formBuilder.group({
      courseId:[null,[Validators.required]],
      studentId:[null,[Validators.required]],
      userId:[],
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
      this.courseService.getCourseById(this.data?.editingInscription?.courseId).subscribe({
        next:(course)=>{this.selectedCourse=course}
      });
      const courseFound=this.selectedCourse;
      const student= this.studentList.find(s=>s.id===this.data?.editingInscription?.studentId);
      this.userForm.patchValue({...this.data.editingInscription, courseFound,student});
    }
  }

  onSave():void{
    console.log('userid');
    console.log(this.authService.user.id);
    if (this.userForm.invalid){
      this.userForm.markAllAsTouched();
    }else{
      this.matDialogRef.close({
          ...this.userForm.value,
          id: this.isEditing ? this.data!.editingInscription!.id : generateRandomString(4),
          createdAt: this.isEditing ? this.data!.editingInscription!.createdAt : new Date(),
          userId: this.isEditing ? this.data!.editingInscription!.userId:this.authService.user.id,
      });
    }
  }
}
