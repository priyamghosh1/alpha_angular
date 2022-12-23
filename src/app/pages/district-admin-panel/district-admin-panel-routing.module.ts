import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DistrictAdminPanelComponent } from './district-admin-panel.component';

const routes: Routes = [{ path: '', component: DistrictAdminPanelComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DistrictAdminPanelRoutingModule { }
