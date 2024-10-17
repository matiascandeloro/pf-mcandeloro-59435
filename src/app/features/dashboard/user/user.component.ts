import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { Student, User } from '../../../model/interfaces';
import { UsersService } from '../../../core/services/users.service';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email','createdAt','actions'];
  dataSource: User[]=[];
  isLoading=false;
  constructor(
    private matDialog:MatDialog,
    private usersService:UsersService
  ){

  }
  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers():void{
    this.isLoading=true;
     this.usersService.getUsers().subscribe({
      next:(users)=>{
        this.dataSource=users;
        this.isLoading=false;
      },
      error:()=>{
        this.isLoading=false;
      },
      complete:()=>{
        this.isLoading=false;
      },
     });
  }

  onDelete(id: string){
    if (confirm('Esta seguro de eliminar el registro?')){
      this.isLoading=true;
       this.usersService.removeUserById(id).subscribe({
        next: (users)=>{
          this.dataSource=users;
          this.isLoading=false;
        },
        error:()=>{
          this.isLoading=false;
        },
        complete:()=>{
          this.isLoading=false;
        }
      });
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
              this.handleUpdate(editingUser.id,result);
            }else{
              this.handleInsert(result);
            }

          }
        }
      });
  }

  handleUpdate(id: string, update:User):void{
    this.isLoading=true;
    this.usersService.updateUserById(id,update).subscribe({
      next:(users)=>{
        this.dataSource=users;
        this.isLoading=false;
      },
      error:()=>{
        this.isLoading=false;
      },
      complete:()=>{
        this.isLoading=false;
      }
    });
  }

  handleInsert(insert:User):void{
    this.isLoading=true;
    this.usersService.insertUser(insert).subscribe({
      next:(users)=>{
        this.dataSource=users;
        this.isLoading=false;
      },
      error:()=>{
        this.isLoading=false;
      },
      complete:()=>{
        this.isLoading=false;
      }
    })
  }

}
