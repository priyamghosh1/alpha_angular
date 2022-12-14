import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatMenuModule } from '@angular/material/menu';
// import { MatIconModule} from '@angular/material/icon';
// import { MatDividerModule } from '@angular/material/divider';
// import { MatListModule } from '@angular/material/list';
// import { MatCardModule } from '@angular/material/card';
// import { MatTabsModule } from '@angular/material/tabs';
// import { NgChartsModule } from 'ng2-charts';
// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';

// import { ReactiveFormsModule } from '@angular/forms';
// import { SidenavComponent } from './sidenav/sidenav.component';
import {SidenavModule} from "./sidenavs/sidenav/sidenav.module";
import {HeaderModule} from "./header/header.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./services/auth.interceptor";
import {SidenavOwnerModule} from "./sidenavs/sidenav-owner/sidenav-owner.module";
import {SidenavDeveloperModule} from "./sidenavs/sidenav-developer/sidenav-developer.module";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { SidenavMpModule } from './sidenavs/sidenav-mp/sidenav-mp.module';
import {SidenavLegislativeModule} from "./sidenavs/sidenav-legislative/sidenav-legislative.module";
import {SidenavPollingVolunteerModule} from "./sidenavs/sidenav-polling-volunteer/sidenav-polling-volunteer.module";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import { SidenavVolunteerModule } from './sidenavs/sidenav-volunteer/sidenav-volunteer.module';
import { SidenavAssemblyConstituencyModule } from './sidenavs/sidenav-assembly-constituency/sidenav-assembly-constituency.module';
import { SidenavBoothVolunteerModule } from './sidenavs/sidenav-booth-volunteer/sidenav-booth-volunteer.module';
import { SidenavDistricttAdminModule } from './sidenavs/sidenav-districtt-admin/sidenav-districtt-admin.module';

@NgModule({
  declarations: [
    AppComponent,
    // SidenavComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        BrowserAnimationsModule,
        MatSidenavModule,
        HttpClientModule,
        // MatToolbarModule,
        // MatMenuModule,
        // MatIconModule,
        // MatDividerModule,
        // MatListModule,
        // MatCardModule,
        // MatTabsModule,
        // NgChartsModule,
        // MatInputModule,
        // MatButtonModule,
        // ReactiveFormsModule,
        SidenavModule,
        HeaderModule,
        SidenavOwnerModule,
        SidenavDeveloperModule,
        SidenavMpModule,
        SidenavVolunteerModule,
        FontAwesomeModule,
        MatProgressSpinnerModule,
        SidenavLegislativeModule,
        SidenavPollingVolunteerModule,
        SidenavAssemblyConstituencyModule,
        SidenavBoothVolunteerModule,
        SidenavDistricttAdminModule
    ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: LocationStrategy, useClass: HashLocationStrategy},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
