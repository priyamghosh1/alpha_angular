import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidenavLegislativeComponent } from './sidenav-legislative.component';

const routes: Routes = [{ path: '', component: SidenavLegislativeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SidenavLegislativeRoutingModule { }
