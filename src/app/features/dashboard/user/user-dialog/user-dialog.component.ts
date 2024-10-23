import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA,  MatDialogRef } from '@angular/material/dialog';
import { generateRandomString } from '../../../../shared/utils';
import { User } from '../../../../model/interfaces';

interface UserDialogData{
  editingUser?: User;
}

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styles: `.div-content{
    width: 1000px;
  }`
})
export class UserDialogComponent {
  userForm:FormGroup;

  constructor(
    private matDialogRef:MatDialogRef<UserDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data?: UserDialogData,
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
    return !!this.data?.editingUser;
  }

  patchFormValue(){
    if (this.data?.editingUser){
      this.userForm.patchValue(this.data.editingUser);
    }
  }

  onSave():void{
    if (this.userForm.invalid){
      this.userForm.markAllAsTouched();
    }else{
      this.matDialogRef.close({
          ...this.userForm.value,
          id: this.isEditing ? this.data!.editingUser!.id : generateRandomString(4),
          createdAt: this.isEditing ? this.data!.editingUser!.createdAt : new Date(),
      });
    }
  }
}
