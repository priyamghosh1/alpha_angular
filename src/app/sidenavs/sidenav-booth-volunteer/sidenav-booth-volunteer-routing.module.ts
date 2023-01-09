import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidenavBoothVolunteerComponent } from './sidenav-booth-volunteer.component';

const routes: Routes = [{ path: '', component: SidenavBoothVolunteerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SidenavBoothVolunteerRoutingModule { }
