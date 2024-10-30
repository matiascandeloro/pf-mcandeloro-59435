import { Component, computed, inject, Inject, signal } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { generateRandomString } from '../../../../shared/utils';
import { ICourse } from '../../../../model/interfaces';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MAT_NATIVE_DATE_FORMATS, MatDateFormats } from '@angular/material/core';
import { MatDatepickerIntl } from '@angular/material/datepicker';

interface CourseDialogData{
  editingCourse?: ICourse;
}


@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrl: './course-dialog.component.scss',
})
export class CourseDialogComponent {
  userForm:FormGroup;


  
  constructor(
    private matDialogRef:MatDialogRef<CourseDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data?: CourseDialogData,
  ){
    console.log(data);
    this.userForm=this.formBuilder.group({
      name:[null,[Validators.required,Validators.maxLength(20),Validators.minLength(3)]],
      description:[null,[Validators.required,Validators.maxLength(140),Validators.minLength(15)]],
      active:[],
    });
    this.patchFormValue();

  }

  private get isEditing(){
    return !!this.data?.editingCourse;
  }

  patchFormValue(){
    if (this.data?.editingCourse){
      this.userForm.patchValue(this.data.editingCourse);
    }
  }

  onSave():void{
    if (this.userForm.invalid){
      this.userForm.markAllAsTouched();
    }else{
      this.matDialogRef.close({
          ...this.userForm.value,
          id: this.isEditing ? this.data!.editingCourse!.id : generateRandomString(4),
          createdAt: this.isEditing ? this.data!.editingCourse!.createdAt : new Date(),
      });
    }
  }
}
