import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { Student } from '../../../model/interfaces';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: Student[] = [
  {name: 'Matias',    lastname: 'Candeloro',  email:'mcandeloro@gmail.com' },
  {name: 'Agustin',   lastname: 'Lopez',  email:'alopez@gmail.com' },
  {name: 'Nahuel',    lastname: 'Ortiz',  email:'nortiz@gmail.com' },
  {name: 'Sergio',    lastname: 'Juarez',  email:'sjuarez@gmail.com' },
  {name: 'Leonardo',  lastname: 'Hernandez',  email:'lhernandez@gmail.com' },
  {name: 'Gustavo',   lastname: 'Fernandez',  email:'gfernandez@gmail.com' },
  {name: 'Francisco', lastname: 'Gutierrez',  email:'fgutierrez@gmail.com' },
  {name: 'Tomas',     lastname: 'Arevalo',  email:'tarevalo@gmail.com' },
  {name: 'Ignacio',   lastname: 'Conti',  email:'iconti@gmail.com' },
  {name: 'David',     lastname: 'Gomez',  email:'dgomez@gmail.com' },
];



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  displayedColumns: string[] = ['position', 'name', 'lastname', 'email','actions'];
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
            this.dataSource= [...this.dataSource,{name: 'David',     lastname: 'Gomez',  email:'dgomez@gmail.com' },]
          }
        }
      });
  }
}
