import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LegendVolunteerComponent } from './legend-volunteer.component';

const routes: Routes = [{ path: '', component: LegendVolunteerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LegendVolunteerRoutingModule { }
