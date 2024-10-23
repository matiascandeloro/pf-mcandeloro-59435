import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { CourseComponent } from './course.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { CourseDialogComponent } from './course-dialog/course-dialog.component';


@NgModule({
  declarations: [
    CourseComponent,
    CourseDetailComponent,
    CourseDialogComponent
  ],
  imports: [
    CommonModule,
    CourseRoutingModule
  ]
})
export class CourseModule { }
