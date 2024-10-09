import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { Student, User } from '../../../model/interfaces';

const ELEMENT_DATA: User[] = [
  {id: 'VaCp', firstName: 'Matias',    lastName: 'Candeloro', email:'mcandeloro@gmail.com', createdAt: new Date()},
  {id: 'Xm7s', firstName: 'Agustin',   lastName: 'Lopez',     email:'alopez@gmail.com',     createdAt: new Date()},
  {id: 'ksRj', firstName: 'Nahuel',    lastName: 'Ortiz',     email:'nortiz@gmail.com',     createdAt: new Date()},
  {id: 'w7cB', firstName: 'Sergio',    lastName: 'Juarez',    email:'sjuarez@gmail.com',    createdAt: new Date()},
  {id: 'vjPT', firstName: 'Leonardo',  lastName: 'Hernandez', email:'lhernandez@gmail.com', createdAt: new Date()},
  {id: 'EToz', firstName: 'Gustavo',   lastName: 'Fernandez', email:'gfernandez@gmail.com', createdAt: new Date()},
  {id: 'vSKX', firstName: 'Francisco', lastName: 'Gutierrez', email:'fgutierrez@gmail.com', createdAt: new Date()},
  {id: 'Fd8b', firstName: 'Tomas',     lastName: 'Arevalo',   email:'tarevalo@gmail.com',   createdAt: new Date()},
  {id: '7BQT', firstName: 'Ignacio',   lastName: 'Conti',     email:'iconti@gmail.com',     createdAt: new Date()},
  {id: 'CGLm', firstName: 'David',     lastName: 'Gomez',     email:'dgomez@gmail.com',     createdAt: new Date()},
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

  onDelete(id: string){
    if (confirm('Esta seguro de eliminar el registro?')){
       this.dataSource=this.dataSource.filter((user)=>user.id!==id);
    }
  }

  openModal(editingUser?:User):void{
    this.matDialog.open(UserDialogComponent,{
      data:{
        editingUser
      }
    })
      .afterClosed()
      .subscribe({
        next:(result)=>{
          console.log('Recibimos ',result);
          if (!!result){
            if (editingUser){
              this.dataSource= this.dataSource.map((user)=>user.id==editingUser.id? {...user,...result}:user);
            }else{
              this.dataSource= [
              ...this.dataSource,{...result,}
              ];
            }

          }
        }
      });
  }
}
