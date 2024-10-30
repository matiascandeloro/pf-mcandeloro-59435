import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Observable } from 'rxjs';
import { IUser } from '../../model/interfaces';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  showFiller = false;
  authUser$: Observable<IUser| null>;

  ENVIRONMENT= environment;

  constructor(private authService:AuthService){
    this.authUser$= this.authService.authUser$;
  }
}
