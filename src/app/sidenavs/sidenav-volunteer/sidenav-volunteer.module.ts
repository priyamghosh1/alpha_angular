import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidenavVolunteerRoutingModule } from './sidenav-volunteer-routing.module';
import { SidenavVolunteerComponent } from './sidenav-volunteer.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    SidenavVolunteerComponent
  ],
  exports: [
    SidenavVolunteerComponent
  ],
  imports: [
    CommonModule,
    SidenavVolunteerRoutingModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatFormFieldModule,
    FontAwesomeModule
  ]
})
export class SidenavVolunteerModule { }
