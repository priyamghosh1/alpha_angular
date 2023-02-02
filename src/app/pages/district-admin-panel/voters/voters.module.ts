import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VotersRoutingModule } from './voters-routing.module';
import { VotersComponent } from './voters.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';


@NgModule({
  declarations: [
    VotersComponent
  ],
  imports: [
    CommonModule,
    VotersRoutingModule,

    MatTabsModule,
    MatCheckboxModule
  ]
})
export class VotersModule { }
