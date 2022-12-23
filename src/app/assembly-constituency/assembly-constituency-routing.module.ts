import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssemblyConstituencyComponent } from './assembly-constituency.component';

const routes: Routes = [{ path: '', component: AssemblyConstituencyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssemblyConstituencyRoutingModule { }
