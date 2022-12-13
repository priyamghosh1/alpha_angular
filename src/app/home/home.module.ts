import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MatTabsModule } from '@angular/material/tabs';
import {ChartModule} from "./chart/chart.module";
import {CascadeSelectModule} from "primeng/cascadeselect";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatTabsModule,
    ChartModule,
    CascadeSelectModule,
    FormsModule
  ]
})
export class HomeModule { }
