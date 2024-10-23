import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { StudentDialogComponent } from './student-dialog/student-dialog.component';


@NgModule({
  declarations: [
    StudentComponent,
    StudentDetailComponent,
    StudentDialogComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule
  ]
})
export class StudentModule { }
