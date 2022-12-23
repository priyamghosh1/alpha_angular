import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LegendVolunteerRoutingModule } from './legend-volunteer-routing.module';
import { LegendVolunteerComponent } from './legend-volunteer.component';


@NgModule({
  declarations: [
    LegendVolunteerComponent
  ],
  imports: [
    CommonModule,
    LegendVolunteerRoutingModule
  ]
})
export class LegendVolunteerModule { }
