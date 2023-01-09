import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidenavDistricttAdminRoutingModule } from './sidenav-districtt-admin-routing.module';
import { SidenavDistricttAdminComponent } from './sidenav-districtt-admin.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    SidenavDistricttAdminComponent
  ],
  exports: [
    SidenavDistricttAdminComponent
  ],
  imports: [
    CommonModule,
    SidenavDistricttAdminRoutingModule,

    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatFormFieldModule,
    FontAwesomeModule
  ]
})
export class SidenavDistricttAdminModule { }
