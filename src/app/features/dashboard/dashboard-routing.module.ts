import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseModule } from './course/course.module';
import { InscriptionModule } from './inscription/inscription.module';
import { StudentModule } from './student/student.module';

const routes: Routes = [
 
  {
    path:'home',
    loadChildren: ()=> import('./home/home.module').then((m)=>m.HomeModule),
  },
  {
    path:'users',
    loadChildren: ()=> import('./user/user.module').then((m)=>m.UserModule),
  },
  {
    path:'courses',
    loadChildren:()=> import('./course/course.module').then((m)=>CourseModule),
  },
  {
    path:'inscriptions',
    loadChildren:()=> import('./inscription/inscription.module').then((m)=>InscriptionModule),
  },
  {
    path:'students',
    loadChildren:()=> import('./student/student.module').then((m)=>StudentModule),
  },
  {
    path:'**',
    redirectTo: 'home',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
