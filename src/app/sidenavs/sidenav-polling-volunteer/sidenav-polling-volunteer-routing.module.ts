import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidenavPollingVolunteerComponent } from './sidenav-polling-volunteer.component';

const routes: Routes = [{ path: '', component: SidenavPollingVolunteerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SidenavPollingVolunteerRoutingModule { }
