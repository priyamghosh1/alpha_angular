import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssemblyConstituencyComponent } from './assembly-constituency.component';
import {AssemblyGuard} from "../services/assembly.guard";

const routes: Routes = [{ path: '', canActivate : [AssemblyGuard], component: AssemblyConstituencyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssemblyConstituencyRoutingModule { }
