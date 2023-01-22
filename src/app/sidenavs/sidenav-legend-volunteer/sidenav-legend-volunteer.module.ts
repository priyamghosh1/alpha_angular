import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidenavLegendVolunteerRoutingModule } from './sidenav-legend-volunteer-routing.module';
import { SidenavLegendVolunteerComponent } from './sidenav-legend-volunteer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    SidenavLegendVolunteerComponent
  ],
  exports:[
    SidenavLegendVolunteerComponent
  ],
  imports: [
    CommonModule,
    SidenavLegendVolunteerRoutingModule,

    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatFormFieldModule,
    FontAwesomeModule
  ]
})
export class SidenavLegendVolunteerModule { }
