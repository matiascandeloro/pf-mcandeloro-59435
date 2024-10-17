import { Component, OnInit } from '@angular/core';
import { AlertService } from './core/services/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'pf-candeloro-59435';

  constructor(private alertService: AlertService){}

  ngOnInit(): void {
    this.alertService.subscribeToAlerts();
  }
  
}
