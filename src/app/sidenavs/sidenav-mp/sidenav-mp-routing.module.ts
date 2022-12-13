import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidenavMpComponent } from './sidenav-mp.component';

const routes: Routes = [{ path: '', component: SidenavMpComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SidenavMpRoutingModule { }
