import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VotersRoutingModule } from './voters-routing.module';
import { VotersComponent } from './voters.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
  declarations: [
    VotersComponent
  ],
  imports: [
    CommonModule,
    VotersRoutingModule,

    MatCheckboxModule,
    MatTabsModule
  ]
})
export class VotersModule { }
