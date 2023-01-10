import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VotersByboothVolunteerComponent } from './voters-bybooth-volunteer.component';

const routes: Routes = [{ path: '', component: VotersByboothVolunteerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VotersByboothVolunteerRoutingModule { }
