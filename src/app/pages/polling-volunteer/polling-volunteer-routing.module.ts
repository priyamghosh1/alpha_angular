import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PollingVolunteerComponent } from './polling-volunteer.component';

const routes: Routes = [{ path: '', component: PollingVolunteerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PollingVolunteerRoutingModule { }
