import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssemblyAdminDashboardComponent } from './assembly-admin-dashboard.component';

const routes: Routes = [{ path: '', component: AssemblyAdminDashboardComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssemblyAdminDashboardRoutingModule { }
