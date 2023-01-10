import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidenavVotersByBoothComponent } from './sidenav-voters-by-booth.component';

const routes: Routes = [{ path: '', component: SidenavVotersByBoothComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SidenavVotersByBoothRoutingModule { }
