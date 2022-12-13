import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidenavPollingVolunteerRoutingModule } from './sidenav-polling-volunteer-routing.module';
import { SidenavPollingVolunteerComponent } from './sidenav-polling-volunteer.component';
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {MatListModule} from "@angular/material/list";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";


@NgModule({
    declarations: [
        SidenavPollingVolunteerComponent
    ],
    exports: [
        SidenavPollingVolunteerComponent
    ],
    imports: [
        CommonModule,
        SidenavPollingVolunteerRoutingModule,
        MatIconModule,
        MatDividerModule,
        MatListModule,
        MatFormFieldModule,
        FontAwesomeModule
    ]
})
export class SidenavPollingVolunteerModule { }
