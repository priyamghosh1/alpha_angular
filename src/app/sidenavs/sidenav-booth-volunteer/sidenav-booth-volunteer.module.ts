import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidenavBoothVolunteerRoutingModule } from './sidenav-booth-volunteer-routing.module';
import { SidenavBoothVolunteerComponent } from './sidenav-booth-volunteer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    SidenavBoothVolunteerComponent
  ],
  exports: [
    SidenavBoothVolunteerComponent
  ],
  imports: [
    CommonModule,
    SidenavBoothVolunteerRoutingModule,

    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatFormFieldModule,
    FontAwesomeModule
  ]
})
export class SidenavBoothVolunteerModule { }
