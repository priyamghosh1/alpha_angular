import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralMemberWithBoothVolunteerComponent } from './general-member-with-booth-volunteer.component';

const routes: Routes = [{ path: '', component: GeneralMemberWithBoothVolunteerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralMemberWithBoothVolunteerRoutingModule { }
