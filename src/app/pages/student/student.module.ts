import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatButtonModule} from "@angular/material/button";
import {MatSortModule} from "@angular/material/sort";
import {MatProgressSpinnerModule, MatSpinner} from "@angular/material/progress-spinner";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {PasswordModule} from "primeng/password";
import {KeyFilterModule} from "primeng/keyfilter";
import {ChartModule} from "primeng/chart";
import {TableModule} from "primeng/table";
import {DialogModule} from "primeng/dialog";
import {StepsModule} from "primeng/steps";
import {MenuItem} from "primeng/api/menuitem";
import {ToastModule} from "primeng/toast";
import {PanelModule} from "primeng/panel";
import {MatStepperModule} from "@angular/material/stepper";




@NgModule({
  declarations: [
    StudentComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    ConfirmDialogModule,
    PasswordModule,
    KeyFilterModule,
    ChartModule,
    TableModule,
    DialogModule,
    StepsModule,
    ToastModule,
    ReactiveFormsModule,
    PanelModule,
    MatStepperModule

  ]
})
export class StudentModule { }
