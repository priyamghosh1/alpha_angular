import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidenavVotersByBoothRoutingModule } from './sidenav-voters-by-booth-routing.module';
import { SidenavVotersByBoothComponent } from './sidenav-voters-by-booth.component';


@NgModule({
  declarations: [
    SidenavVotersByBoothComponent
  ],
  imports: [
    CommonModule,
    SidenavVotersByBoothRoutingModule
  ]
})
export class SidenavVotersByBoothModule { }
