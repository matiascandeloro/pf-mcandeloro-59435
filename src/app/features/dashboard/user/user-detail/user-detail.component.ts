import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../../../core/services/users.service';
import { IUser } from '../../../../model/interfaces';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit{
  idUsuario?: string;

  user?:IUser;
  isLoading=false;
  constructor(private activatedRoute:ActivatedRoute, private usersService:UsersService){
    
  }
  ngOnInit(): void {
    this.isLoading=true;
    this.usersService.getUserById(this.activatedRoute.snapshot.params['id']).subscribe({
      next: (user)=>{
        this.user=user;
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
