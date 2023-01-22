import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VotersRoutingModule } from './voters-routing.module';
import { VotersComponent } from './voters.component';
import { MatCheckboxModule } from '@angular/material/checkbox';


@NgModule({
  declarations: [
    VotersComponent
  ],
  imports: [
    CommonModule,
    VotersRoutingModule,

    MatCheckboxModule

  ]
})
export class VotersModule { }
