import { Component, OnInit } from '@angular/core';
import {PollingMember} from "../../models/PollingMember";
import {AssemblyAdminDashboardService} from "../../services/assembly-admin-dashboard.service";
import {AuthService} from "../../services/auth.service";
import {User} from "../../models/user.model";
import {AssemblyAdminReport} from "../../models/AssemblyAdminReport";
import {PollingVolunteer} from "../../models/PollingVolunteer";

@Component({
  selector: 'app-assembly-admin-dashboard',
  templateUrl: './assembly-admin-dashboard.component.html',
  styleUrls: ['./assembly-admin-dashboard.component.scss']
})
export class AssemblyAdminDashboardComponent implements OnInit {

  loggedInUser: User | undefined;
  reportData: AssemblyAdminReport[] = []
  volunteerReportsData: PollingVolunteer[] = [];
  workerReportsData: PollingVolunteer[] = [];
  displayFirstMasterReport = true;
  displaySecondVolunteerReport = false;
  displayThirdWorkerReport = false;

  constructor(private assemblyAdminDashboardService: AssemblyAdminDashboardService,private authService: AuthService,) { }

  ngOnInit(): void {
    this.loggedInUser = this.authService.userBehaviorSubject.value;

    this.assemblyAdminDashboardService.getReport(this.loggedInUser?.assemblyConstituencyId).subscribe((response: {status:string,message:string,data:AssemblyAdminReport[]}) => {
      this.reportData =  response.data;
    });
    this.assemblyAdminDashboardService.getReportListener().subscribe((response: any) => {
      this.reportData = response;
    });

  }

  getVolunteersByPollingId(pollingData:any){
    this.assemblyAdminDashboardService.getVolunteerDetailsReport(pollingData.pollingStationId).subscribe((response: {status:string,message:string,data:PollingVolunteer[]}) => {
      this.volunteerReportsData =  response.data;
      this.displayFirstMasterReport = false;
      this.displaySecondVolunteerReport = true;
      this.displayThirdWorkerReport = false;
    });

    this.assemblyAdminDashboardService.getVolunteerDetailsReportListener().subscribe((response: any) => {
      this.volunteerReportsData = response;
    });
  }

  getWorkersByVolunteerId(volunteerData:any){
    this.assemblyAdminDashboardService.getWorkerReport(volunteerData.id).subscribe((response: {status:string,message:string,data:PollingVolunteer[]}) => {
      this.workerReportsData =  response.data;
      this.displayFirstMasterReport = false;
      this.displaySecondVolunteerReport = false;
      this.displayThirdWorkerReport = true;
    });

    this.assemblyAdminDashboardService.getWorkerReportListener().subscribe((response: any) => {
      this.workerReportsData = response;
    });
  }


  goToMainReport() {
    this.displayFirstMasterReport = true;
    this.displaySecondVolunteerReport = false;
    this.displayThirdWorkerReport = false;
  }
}
