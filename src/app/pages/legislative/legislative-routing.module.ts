import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LegislativeComponent } from './legislative.component';

const routes: Routes = [{ path: '', component: LegislativeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LegislativeRoutingModule { }
