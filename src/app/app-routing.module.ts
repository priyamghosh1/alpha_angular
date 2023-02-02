import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StudentResolver} from "./resolvers/student.resolver";
import {AuthGuard} from "./services/auth.guard";
import {AuthOwnerGuard} from "./services/auth-owner.guard";



//------------------------------
const routes: Routes = [

  { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  {
    path: 'student',
    canActivate : [AuthGuard,AuthOwnerGuard],
    loadChildren: () => import('./pages/student/student.module')
      .then(mod => mod.StudentModule),
    resolve: {studentResolverData: StudentResolver},
    data: {loginType: 'owner'},

  },
  { path: 'owner', loadChildren: () => import('./pages/owner/owner.module').then(m => m.OwnerModule) },
  { path: 'mp', loadChildren: () => import('./pages/mp-level/mp-level.module').then(m => m.MpLevelModule) },
  { path: 'volunteer', loadChildren: () => import('./volunteer/volunteer.module').then(m => m.VolunteerModule) },
  { path: 'legislative', loadChildren: () => import('./pages/legislative/legislative.module').then(m => m.LegislativeModule) },
  { path: 'assemblyAdminDashboard', loadChildren: () => import('./pages/assembly-admin-dashboard/assembly-admin-dashboard.module').then(m => m.AssemblyAdminDashboardModule) },

  { path: 'Sidenav', loadChildren: () => import('./sidenavs/sidenav/sidenav.module').then(m => m.SidenavModule) },

  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },

  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },

  { path: 'Header', loadChildren: () => import('./header/header.module').then(m => m.HeaderModule) },

  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },

  { path: 'Owner', loadChildren: () => import('./pages/owner/owner.module').then(m => m.OwnerModule) },

  { path: 'SidenavOwner', loadChildren: () => import('./sidenavs/sidenav-owner/sidenav-owner.module').then(m => m.SidenavOwnerModule) },

  { path: 'developer', loadChildren: () => import('./pages/developer/developer.module').then(m => m.DeveloperModule) },

  { path: 'SidenavDeveloper', loadChildren: () => import('./sidenavs/sidenav-developer/sidenav-developer.module').then(m => m.SidenavDeveloperModule) },

  { path: 'student', loadChildren: () => import('./pages/student/student.module').then(m => m.StudentModule) },

  { path: 'LineChart', loadChildren: () => import('./pages/developer/charts/line-chart/line-chart.module').then(m => m.LineChartModule) },

  { path: 'BarChart', loadChildren: () => import('./pages/developer/charts/bar-chart/bar-chart.module').then(m => m.BarChartModule) },

  { path: 'mpLevel', loadChildren: () => import('./pages/mp-level/mp-level.module').then(m => m.MpLevelModule) },

  { path: 'sidenavMp', loadChildren: () => import('./sidenavs/sidenav-mp/sidenav-mp.module').then(m => m.SidenavMpModule) },

  { path: 'legislative', loadChildren: () => import('./pages/legislative/legislative.module').then(m => m.LegislativeModule) },
  { path: 'pollingVolunteer', loadChildren: () => import('./pages/polling-volunteer/polling-volunteer.module').then(m => m.PollingVolunteerModule) },

  { path: 'sidenavLegislative', loadChildren: () => import('./sidenavs/sidenav-legislative/sidenav-legislative.module').then(m => m.SidenavLegislativeModule) },

  { path: 'pollingVolunteer', loadChildren: () => import('./pages/polling-volunteer/polling-volunteer.module').then(m => m.PollingVolunteerModule) },
  { path: 'assemblyConstituency', loadChildren: () => import('./assembly-constituency/assembly-constituency.module').then(m => m.AssemblyConstituencyModule) },
  { path: 'boothVolunteer', loadChildren: () => import('./booth-volunteer/booth-volunteer.module').then(m => m.BoothVolunteerModule) },
  { path: 'boothVolunteerCreateVoter', loadChildren: () => import('./booth-volunteer/voters-bybooth-volunteer/voters-bybooth-volunteer.module').then(m => m.VotersByboothVolunteerModule) },
  { path: 'DitrictAdmin', loadChildren: () => import('./pages/district-admin-panel/district-admin-panel.module').then(m => m.DistrictAdminPanelModule) },
  // { path: 'DitrictAdminByLegend', loadChildren: () => import('./legend-volunteer/legend-volunteer-routing.module').then(m => m.LegendVolunteerRoutingModule) },

  { path: 'sidenavPollingVolunteer', loadChildren: () => import('./sidenavs/sidenav-polling-volunteer/sidenav-polling-volunteer.module').then(m => m.SidenavPollingVolunteerModule) },

  { path: 'districtAdminPanel', loadChildren: () => import('./pages/district-admin-panel/district-admin-panel.module').then(m => m.DistrictAdminPanelModule) },

  { path: 'assemblyConstituency', loadChildren: () => import('./assembly-constituency/assembly-constituency.module').then(m => m.AssemblyConstituencyModule) },

  { path: 'boothVolunteer', loadChildren: () => import('./booth-volunteer/booth-volunteer.module').then(m => m.BoothVolunteerModule) },

  // { path: 'volunteer', loadChildren: () => import('.pages/volunteer/v').then(m => m.VolunteerModule) },

  { path: 'legendVolunteer', loadChildren: () => import('./legend-volunteer/legend-volunteer.module').then(m => m.LegendVolunteerModule) },

  { path: 'sidenavVolunteer', loadChildren: () => import('./sidenavs/sidenav-volunteer/sidenav-volunteer.module').then(m => m.SidenavVolunteerModule) },

  { path: 'sidenav-assembly-constituency', loadChildren: () => import('./sidenavs/sidenav-assembly-constituency/sidenav-assembly-constituency.module').then(m => m.SidenavAssemblyConstituencyModule) },

  { path: 'sidenavBoothVolunteer', loadChildren: () => import('./sidenavs/sidenav-booth-volunteer/sidenav-booth-volunteer.module').then(m => m.SidenavBoothVolunteerModule) },

  // { path: 'GeneralMemberWithBoothVolunteer', loadChildren: () => import('./general-member-with-booth-volunteer/general-member-with-booth-volunteer.module').then(m => m.GeneralMemberWithBoothVolunteerModule) },

  { path: 'sidenavDistricttAdmin', loadChildren: () => import('./sidenavs/sidenav-districtt-admin/sidenav-districtt-admin.module').then(m => m.SidenavDistricttAdminModule) },

  { path: 'votersByboothVolunteer', loadChildren: () => import('./booth-volunteer/voters-bybooth-volunteer/voters-bybooth-volunteer.module').then(m => m.VotersByboothVolunteerModule) },

  { path: 'sidenavVotersByBooth', loadChildren: () => import('./sidenavs/sidenav-booth-volunteer/sidenav-voters-by-booth/sidenav-voters-by-booth.module').then(m => m.SidenavVotersByBoothModule) },

  { path: 'pollingNumber', loadChildren: () => import('./assembly-constituency/polling-number/polling-number.module').then(m => m.PollingNumberModule) },

  { path: 'pollingVolunteer/voters', loadChildren: () => import('./pages/polling-volunteer/voters/voters.module').then(m => m.VotersModule) },

  { path: 'assemblyConstituency/voters', loadChildren: () => import('./assembly-constituency/voters/voters.module').then(m => m.VotersModule) },

  { path: 'sidenavLegendVolunteer', loadChildren: () => import('./sidenavs/sidenav-legend-volunteer/sidenav-legend-volunteer.module').then(m => m.SidenavLegendVolunteerModule) },

  { path: 'legendVolunteer/voters', loadChildren: () => import('./legend-volunteer/voters/voters.module').then(m => m.VotersModule) },

  { path: 'legislativeAdmin/voters', loadChildren: () => import('./pages/legislative/voters/voters.module').then(m => m.VotersModule) },

  { path: 'ditrictAdmin/voters', loadChildren: () => import('./pages/district-admin-panel/voters/voters.module').then(m => m.VotersModule) },

  // { path: 'volunteer', loadChildren: () => import('./pages/volunteer/volunteer.module').then(m => m.VolunteerModule) },


];



@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
