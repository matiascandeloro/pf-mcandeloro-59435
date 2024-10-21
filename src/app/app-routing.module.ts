import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './features/auth/auth.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { DashboardModule } from './features/dashboard/dashboard.module';

const routes: Routes = [
  {
    path:'auth',
    component: AuthComponent,
    loadChildren:()=> import('./features/auth/auth.module').then((m)=> m.AuthModule),
  },
  {
    path:'dashboard',
    component: DashboardComponent,
    loadChildren:()=>import('./features/dashboard/dashboard.module').then((m)=>m.DashboardModule),
  },
  {
    path:'**',
    redirectTo: 'auth/login',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
