import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PollingVolunteerRoutingModule } from './polling-volunteer-routing.module';
import { PollingVolunteerComponent } from './polling-volunteer.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatCardModule} from "@angular/material/card";
import {NgSelectModule} from "@ng-select/ng-select";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatStepperModule } from '@angular/material/stepper';
import { MatMenuModule } from '@angular/material/menu';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgxPrintModule } from 'ngx-print';


@NgModule({
  declarations: [
    PollingVolunteerComponent
  ],
  imports: [
    CommonModule,
    PollingVolunteerRoutingModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule ,
    MatCardModule,
    NgSelectModule,

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
    NgxPrintModule
  ]
})
export class PollingVolunteerModule { }
