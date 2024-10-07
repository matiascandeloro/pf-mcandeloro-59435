import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { Student, User } from '../../../model/interfaces';

const ELEMENT_DATA: User[] = [
  {id: '0001', firstName: 'Matias',    lastName: 'Candeloro', email:'mcandeloro@gmail.com', createdAt: new Date()},
  {id: '0002', firstName: 'Agustin',   lastName: 'Lopez',     email:'alopez@gmail.com',     createdAt: new Date()},
  {id: '0003', firstName: 'Nahuel',    lastName: 'Ortiz',     email:'nortiz@gmail.com',     createdAt: new Date()},
  {id: '0004', firstName: 'Sergio',    lastName: 'Juarez',    email:'sjuarez@gmail.com',    createdAt: new Date()},
  {id: '0005', firstName: 'Leonardo',  lastName: 'Hernandez', email:'lhernandez@gmail.com', createdAt: new Date()},
  {id: '0006', firstName: 'Gustavo',   lastName: 'Fernandez', email:'gfernandez@gmail.com', createdAt: new Date()},
  {id: '0007', firstName: 'Francisco', lastName: 'Gutierrez', email:'fgutierrez@gmail.com', createdAt: new Date()},
  {id: '0008', firstName: 'Tomas',     lastName: 'Arevalo',   email:'tarevalo@gmail.com',   createdAt: new Date()},
  {id: '0009', firstName: 'Ignacio',   lastName: 'Conti',     email:'iconti@gmail.com',     createdAt: new Date()},
  {id: '0010', firstName: 'David',     lastName: 'Gomez',     email:'dgomez@gmail.com',     createdAt: new Date()},
];



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  displayedColumns: string[] = ['id', 'name', 'email','createdAt','actions'];
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
            this.dataSource= [...this.dataSource,{id:'0011',firstName: 'David',     lastName: 'Gomez',  email:'dgomez@gmail.com', createdAt: new Date() },]
          }
        }
      });
  }
}
