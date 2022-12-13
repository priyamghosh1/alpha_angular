import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidenavLegislativeRoutingModule } from './sidenav-legislative-routing.module';
import { SidenavLegislativeComponent } from './sidenav-legislative.component';
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {MatListModule} from "@angular/material/list";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";


@NgModule({
    declarations: [
        SidenavLegislativeComponent
    ],
    exports: [
        SidenavLegislativeComponent
    ],
    imports: [
        CommonModule,
        SidenavLegislativeRoutingModule,
        MatIconModule,
        MatDividerModule,
        MatListModule,
        MatFormFieldModule,
        FontAwesomeModule
    ]
})
export class SidenavLegislativeModule { }
