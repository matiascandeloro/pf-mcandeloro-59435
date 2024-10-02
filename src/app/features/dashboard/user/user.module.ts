import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { SharedModule } from '../../../shared/shared.module';
import { UserDialogComponent } from './user-dialog/user-dialog.component';


@NgModule({
  declarations: [
    UserComponent,
    UserDialogComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule

  ],
  exports:[
    UserComponent
  ]
})
export class UserModule { }
