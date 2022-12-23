import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DistrictAdminPanelRoutingModule } from './district-admin-panel-routing.module';
import { DistrictAdminPanelComponent } from './district-admin-panel.component';


@NgModule({
  declarations: [
    DistrictAdminPanelComponent
  ],
  imports: [
    CommonModule,
    DistrictAdminPanelRoutingModule
  ]
})
export class DistrictAdminPanelModule { }
