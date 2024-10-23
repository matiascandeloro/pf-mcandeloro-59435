import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InscriptionComponent } from './inscription.component';
import { InscriptionDetailComponent } from './inscription-detail/inscription-detail.component';

const routes: Routes = [
  {
    path:'',
    component:InscriptionComponent
  },
  {
    path:':id/detail',
    component: InscriptionDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InscriptionRoutingModule { }
