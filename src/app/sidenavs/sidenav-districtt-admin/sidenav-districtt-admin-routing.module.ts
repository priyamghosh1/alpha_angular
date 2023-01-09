import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidenavDistricttAdminComponent } from './sidenav-districtt-admin.component';

const routes: Routes = [{ path: '', component: SidenavDistricttAdminComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SidenavDistricttAdminRoutingModule { }
