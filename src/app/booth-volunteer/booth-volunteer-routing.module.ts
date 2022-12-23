import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoothVolunteerComponent } from './booth-volunteer.component';

const routes: Routes = [{ path: '', component: BoothVolunteerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoothVolunteerRoutingModule { }
