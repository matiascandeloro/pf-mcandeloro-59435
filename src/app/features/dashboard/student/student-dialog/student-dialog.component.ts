import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { generateRandomString } from '../../../../shared/utils';
import { IStudent } from '../../../../model/interfaces';

interface StudentDialogData{
  editingStudent?: IStudent;
}


@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html',
  styleUrl: './student-dialog.component.scss'
})
export class StudentDialogComponent {
  userForm:FormGroup;

  constructor(
    private matDialogRef:MatDialogRef<StudentDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data?: StudentDialogData,
  ){
    console.log(data);
    this.userForm=this.formBuilder.group({
      firstName:[null,[Validators.required,Validators.maxLength(20),Validators.minLength(3),Validators.pattern(/^[A-Za-z ]+$/)]],
      lastName:[null,[Validators.required,Validators.maxLength(20),Validators.minLength(3),Validators.pattern(/^[A-Za-z ]+$/)]],
      email:[null,[Validators.required,Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
    });
    this.patchFormValue();
  }

  private get isEditing(){
    return !!this.data?.editingStudent;
  }

  patchFormValue(){
    if (this.data?.editingStudent){
      this.userForm.patchValue(this.data.editingStudent);
    }
  }

  onSave():void{
    if (this.userForm.invalid){
      this.userForm.markAllAsTouched();
    }else{
      this.matDialogRef.close({
          ...this.userForm.value,
          id: this.isEditing ? this.data!.editingStudent!.id : generateRandomString(4),
          createdAt: this.isEditing ? this.data!.editingStudent!.createdAt : new Date(),
      });
    }
  }
}
