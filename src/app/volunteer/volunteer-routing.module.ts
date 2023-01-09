import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VolunteerComponent } from './volunteer.component';
import {VolunteerGuard} from "../services/volunteer.guard";

const routes: Routes = [{ path: '', canActivate : [VolunteerGuard], component: VolunteerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VolunteerRoutingModule { }
