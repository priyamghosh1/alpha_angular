import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoothVolunteerRoutingModule } from './booth-volunteer-routing.module';
import { BoothVolunteerComponent } from './booth-volunteer.component';


@NgModule({
  declarations: [
    BoothVolunteerComponent
  ],
  imports: [
    CommonModule,
    BoothVolunteerRoutingModule
  ]
})
export class BoothVolunteerModule { }
