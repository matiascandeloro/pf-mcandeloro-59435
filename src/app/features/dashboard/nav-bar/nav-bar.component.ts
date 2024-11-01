import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Observable } from 'rxjs';
import { IUser } from '../../../model/interfaces';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  authUser$: Observable<IUser| null>;
  isAdmin:boolean=false;
  constructor(
    private router:Router,
    private authService:AuthService,
  ){
    this.authUser$= this.authService.authUser$;
    this.isAdmin=authService.isAdmin();
  }
  logout():void{
    this.authService.logout();
  }
}
