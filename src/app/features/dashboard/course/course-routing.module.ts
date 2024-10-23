import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseComponent } from './course.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';

const routes: Routes = [  
  {
  path:'',
    component:CourseComponent
  },
  {
    path:':id/detail',
    component: CourseDetailComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
