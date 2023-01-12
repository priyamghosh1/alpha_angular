import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PollingNumberComponent } from './polling-number.component';

const routes: Routes = [{ path: '', component: PollingNumberComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PollingNumberRoutingModule { }
