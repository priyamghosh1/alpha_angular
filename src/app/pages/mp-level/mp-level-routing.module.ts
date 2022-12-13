import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MpLevelComponent } from './mp-level.component';

const routes: Routes = [{ path: '', component: MpLevelComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MpLevelRoutingModule { }
