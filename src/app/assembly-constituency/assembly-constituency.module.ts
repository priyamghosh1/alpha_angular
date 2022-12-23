import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssemblyConstituencyRoutingModule } from './assembly-constituency-routing.module';
import { AssemblyConstituencyComponent } from './assembly-constituency.component';


@NgModule({
  declarations: [
    AssemblyConstituencyComponent
  ],
  imports: [
    CommonModule,
    AssemblyConstituencyRoutingModule
  ]
})
export class AssemblyConstituencyModule { }
