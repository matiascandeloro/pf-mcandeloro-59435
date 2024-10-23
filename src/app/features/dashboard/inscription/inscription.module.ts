import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InscriptionRoutingModule } from './inscription-routing.module';
import { InscriptionComponent } from './inscription.component';
import { InscriptionDetailComponent } from './inscription-detail/inscription-detail.component';
import { InscriptionDialogComponent } from './inscription-dialog/inscription-dialog.component';


@NgModule({
  declarations: [
    InscriptionComponent,
    InscriptionDetailComponent,
    InscriptionDialogComponent
  ],
  imports: [
    CommonModule,
    InscriptionRoutingModule
  ]
})
export class InscriptionModule { }
