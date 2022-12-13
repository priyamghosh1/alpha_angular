import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssemblyAdminDashboardRoutingModule } from './assembly-admin-dashboard-routing.module';
import { AssemblyAdminDashboardComponent } from './assembly-admin-dashboard.component';


@NgModule({
  declarations: [
    AssemblyAdminDashboardComponent
  ],
  imports: [
    CommonModule,
    AssemblyAdminDashboardRoutingModule
  ]
})
export class AssemblyAdminDashboardModule { }
