import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PollingNumberComponent } from './polling-number.component';
import {AssemblyGuard} from "../../services/assembly.guard";

const routes: Routes = [{ path: '', canActivate : [AssemblyGuard], component: PollingNumberComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PollingNumberRoutingModule { }
