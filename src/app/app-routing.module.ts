import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './features/auth/auth.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { AuthModule } from './features/auth/auth.module';

const routes: Routes = [
  {
    path:'auth',
    component: AuthComponent,
    loadChildren:()=> import('./features/auth/auth.module').then((m)=> m.AuthModule),
  },
  {
    path:'dashboard',
    component: DashboardComponent
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
