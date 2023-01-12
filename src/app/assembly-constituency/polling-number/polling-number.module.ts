import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PollingNumberRoutingModule } from './polling-number-routing.module';
import { PollingNumberComponent } from './polling-number.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatStepperModule } from '@angular/material/stepper';
import { MatMenuModule } from '@angular/material/menu';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    PollingNumberComponent
  ],
  imports: [
    CommonModule,
    PollingNumberRoutingModule,

    FormsModule,
    MatFormFieldModule,

    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule ,
    MatCardModule,
    NgSelectModule,
    MatCheckboxModule,
    MatStepperModule,
    MatMenuModule,
    MatOptionModule,
    MatIconModule,
    MatButtonModule,
  ]
})
export class PollingNumberModule { }
