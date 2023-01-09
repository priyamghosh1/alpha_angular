import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralMemberWithBoothVolunteerRoutingModule } from './general-member-with-booth-volunteer-routing.module';
import { GeneralMemberWithBoothVolunteerComponent } from './general-member-with-booth-volunteer.component';
import { NgxPrintModule } from 'ngx-print';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    GeneralMemberWithBoothVolunteerComponent
  ],
  imports: [
    CommonModule,
    GeneralMemberWithBoothVolunteerRoutingModule,

    FormsModule,
    MatFormFieldModule,

    ReactiveFormsModule,
    MatInputModule,
    // MatSelectModule ,
    MatCardModule,
    NgSelectModule,
    MatCheckboxModule,
    MatStepperModule,
    MatMenuModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule,
    MatButtonModule,
    NgxPrintModule
  ]
})
export class GeneralMemberWithBoothVolunteerModule { }
