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
    NgSelectModule
  ]
})
export class PollingVolunteerModule { }
