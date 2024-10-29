import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  constructor(
    private router:Router,
    private authService:AuthService,
  ){}
  logout():void{
    //localStorage.removeItem('token');
    //this.router.navigate(['auth','login']);
    this.authService.logout();
  }
}
