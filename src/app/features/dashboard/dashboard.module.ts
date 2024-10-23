import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../../shared/shared.module';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { InscriptionDetailComponent } from './inscription-detail/inscription-detail.component';


@NgModule({
  declarations: [
    DashboardComponent,
    CourseDetailComponent,
    StudentDetailComponent,
    InscriptionDetailComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
],
  exports:[
    DashboardComponent
  ]
})
export class DashboardModule { }
