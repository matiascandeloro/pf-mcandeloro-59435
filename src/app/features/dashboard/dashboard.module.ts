import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { UserModule } from "./user/user.module";
import { share } from 'rxjs';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    UserModule,
    SharedModule
],
  exports:[
    DashboardComponent
  ]
})
export class DashboardModule { }
