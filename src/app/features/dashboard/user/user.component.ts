import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { Student, User } from '../../../model/interfaces';

const ELEMENT_DATA: User[] = [
  {firstName: 'Matias',    lastName: 'Candeloro',  email:'mcandeloro@gmail.com' },
  {firstName: 'Agustin',   lastName: 'Lopez',  email:'alopez@gmail.com' },
  {firstName: 'Nahuel',    lastName: 'Ortiz',  email:'nortiz@gmail.com' },
  {firstName: 'Sergio',    lastName: 'Juarez',  email:'sjuarez@gmail.com' },
  {firstName: 'Leonardo',  lastName: 'Hernandez',  email:'lhernandez@gmail.com' },
  {firstName: 'Gustavo',   lastName: 'Fernandez',  email:'gfernandez@gmail.com' },
  {firstName: 'Francisco', lastName: 'Gutierrez',  email:'fgutierrez@gmail.com' },
  {firstName: 'Tomas',     lastName: 'Arevalo',  email:'tarevalo@gmail.com' },
  {firstName: 'Ignacio',   lastName: 'Conti',  email:'iconti@gmail.com' },
  {firstName: 'David',     lastName: 'Gomez',  email:'dgomez@gmail.com' },
];



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  displayedColumns: string[] = ['position', 'name', 'email','actions'];
  dataSource = ELEMENT_DATA;
  constructor(private matDialog:MatDialog){

  }

  openModal():void{
    this.matDialog.open(UserDialogComponent)
      .afterClosed()
      .subscribe({
        next:(result)=>{
          console.log('Recibimos ',result);
          if (!!result){
            this.dataSource= [...this.dataSource,{firstName: 'David',     lastName: 'Gomez',  email:'dgomez@gmail.com' },]
          }
        }
      });
  }
}
