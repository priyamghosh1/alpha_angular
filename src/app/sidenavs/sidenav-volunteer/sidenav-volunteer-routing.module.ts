import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidenavVolunteerComponent } from './sidenav-volunteer.component';

const routes: Routes = [{ path: '', component: SidenavVolunteerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SidenavVolunteerRoutingModule { }
