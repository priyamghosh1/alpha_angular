import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidenavMpRoutingModule } from './sidenav-mp-routing.module';
import { SidenavMpComponent } from './sidenav-mp.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    SidenavMpComponent
  ],
  exports: [
    SidenavMpComponent
  ],
  imports: [
    CommonModule,
    SidenavMpRoutingModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatFormFieldModule,
    FontAwesomeModule
  ]
})
export class SidenavMpModule { }
