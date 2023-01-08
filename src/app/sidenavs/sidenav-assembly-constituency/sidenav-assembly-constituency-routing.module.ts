import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidenavAssemblyConstituencyComponent } from './sidenav-assembly-constituency.component';

const routes: Routes = [{ path: '', component: SidenavAssemblyConstituencyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SidenavAssemblyConstituencyRoutingModule { }
