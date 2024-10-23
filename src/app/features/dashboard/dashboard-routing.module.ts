import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
    path:'**',
    redirectTo: 'home',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
