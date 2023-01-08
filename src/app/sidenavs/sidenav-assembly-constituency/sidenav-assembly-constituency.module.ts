import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidenavAssemblyConstituencyRoutingModule } from './sidenav-assembly-constituency-routing.module';
import { SidenavAssemblyConstituencyComponent } from './sidenav-assembly-constituency.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    SidenavAssemblyConstituencyComponent
  ],
  exports: [
    SidenavAssemblyConstituencyComponent
  ],
  imports: [
    CommonModule,
    SidenavAssemblyConstituencyRoutingModule,

    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatFormFieldModule,
    FontAwesomeModule

  ]
})
export class SidenavAssemblyConstituencyModule { }
