import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styles: `.div-content{
    width: 500px;
  }`
})
export class UserDialogComponent {

  constructor(private matDialogRef:MatDialogRef<UserDialogComponent>){

  }

  onSave():void{
    this.matDialogRef.close({resultado: 'ok'});
  }
}
