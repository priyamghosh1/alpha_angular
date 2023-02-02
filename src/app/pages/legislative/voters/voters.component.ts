import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AssemblyAdminService } from 'src/app/services/assembly-admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { LegendVolunteerService } from 'src/app/services/legend-volunteer.service';
import { LegislativeService } from 'src/app/services/legislative.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-voters',
  templateUrl: './voters.component.html',
  styleUrls: ['./voters.component.scss']
})
export class VotersComponent implements OnInit {
  loggedInUser: User | undefined;
  votersList: any[] = [];
  imageSrcVoter: string | ArrayBuffer | null = "";
  imageSrcTable: string | ArrayBuffer | null = "";
  defaultPicture: string = "";

  private BASE_PUBLIC_URL = environment.BASE_PUBLIC_URL;

  showPhoto = true;
  showName = true;
  showMemberCode = false;
  showGuardianName = true;
  showAge = true;
  showGender = true;
  showPoliceStation = false;
  showOcupation = true;
  showReligion = true;
  showEmail = false;
  showMobileOne = true;
  showMobileTwo = false;
  showVoterId = true;
  showAadharId = true;
  showCast = false;
  showPostOffice = false;
  showHouseNo = true;
  showRoadNo = true;
  showPinCode = false;
  showPollingNumber = false;


  legend: any[] = [];
  districtAdmins: any[] = [];
  assemblyVolunteer: any[] = [];
  PolingAgentByAssembly: any[] = [];
  boothVolunteerByPolingAgent: any[] = [];
  volunteer: any[] = [];


  showLedgend = true;
  showDistrictAdmin = false;
  showAssemblyVolunteer = false;
  showPollingVolunteer = false;
  showBoothVolunteer = false;
  showVolunteer = false;
  showVoters = false;


  legengVolunteers: any[] = [];


  imageSrc: string | ArrayBuffer | null = "";
  // @ts-ignore


  file: File;

  constructor(private legislativeService: LegislativeService,
    private authService: AuthService,
    private assemblyAdminService: AssemblyAdminService,) { }

  ngOnInit(): void {

    // @ts-ignore

    this.file = File;

    this.loggedInUser = this.authService.userBehaviorSubject.value;
    console.log(this.loggedInUser);

    this.legislativeService.getvotersByLegislative(this.loggedInUser?.uniqueId).subscribe((response: { status: string, message: string, data: any[] }) => {
      this.votersList = response.data;
      console.log(this.votersList);
    });

    this.legislativeService.getLegendByLegislative(this.loggedInUser.uniqueId).subscribe((response) => {
      this.legengVolunteers = response.data;
      // console.log(this.districtAdmins);
    });

  }

  changeShowStatus(x: any, y: any) {
    this.showName = x === 'showName' ? y : this.showName;
    this.showAge = x === 'showAge' ? y : this.showAge;
    this.showEmail = x === 'showEmail' ? y : this.showEmail;
    this.showMemberCode = x === 'showMemberCode' ? y : this.showMemberCode;
    this.showGuardianName = x === 'showGuardianName' ? y : this.showGuardianName;
    this.showGender = x === 'showGender' ? y : this.showGender;
    this.showPoliceStation = x === 'showPoliceStation' ? y : this.showPoliceStation;
    this.showOcupation = x === 'showOcupation' ? y : this.showOcupation;
    this.showReligion = x === 'showReligion' ? y : this.showReligion;
    this.showMobileOne = x === 'showMobileOne' ? y : this.showMobileOne;
    this.showMobileTwo = x === 'showMobileTwo' ? y : this.showMobileTwo;
    this.showVoterId = x === 'showVoterId' ? y : this.showVoterId;
    this.showAadharId = x === 'showAadharId' ? y : this.showAadharId;
    this.showCast = x === 'showCast' ? y : this.showCast;
    this.showPostOffice = x === 'showPostOffice' ? y : this.showPostOffice;
    this.showHouseNo = x === 'showHouseNo' ? y : this.showHouseNo;
    this.showRoadNo = x === 'showRoadNo' ? y : this.showRoadNo;
    this.showPinCode = x === 'showPinCode' ? y : this.showPinCode;
    this.showPollingNumber = x === 'showPollingNumber' ? y : this.showPollingNumber;
    this.showPhoto = x === 'showPhoto' ? y : this.showPhoto;


  }


  getDistrictAdminByLegend(legendData: any) {

    this.showDistrictAdmin = true;
    this.showLedgend = false;
    // console.log(legendData);

    this.legislativeService.getDistrictAdminByLegend(legendData.id).subscribe((response) => {
      this.districtAdmins = response.data;
      // console.log(this.districtAdmins);
    });
  }

  getAssemblyByDistrictAdmin(districtAdminData: any) {
    // console.log(districtAdminData);
    this.showDistrictAdmin = false;
    this.showAssemblyVolunteer = true;

    this.legislativeService.getAssemblyVolunteerByDistrictAdmin(districtAdminData.id).subscribe((response: any) => {
      this.assemblyVolunteer = response.data;
      // console.log(this.assemblyVolunteer);
    });
  }

  getPollingMemberByAssembly(AssemblyData: any) {
    // console.log(AssemblyData);

    this.showAssemblyVolunteer = false;
    this.showPollingVolunteer = true;

    this.legislativeService.getPolingAgentByAssembly(AssemblyData.id).subscribe((response: any) => {
      this.PolingAgentByAssembly = response.data;
      // console.log("PolingAgentByAssembly", this.PolingAgentByAssembly)
    })
  }

  getBoothVolunteerByPollingMember(pollingMemberData: any) {
    // console.log(pollingMemberData);
    this.showBoothVolunteer = true;
    this.showPollingVolunteer = false;

    this.legislativeService.getBoothByPolingAgent(pollingMemberData.id).subscribe((response: any) => {
      this.boothVolunteerByPolingAgent = response.data;
      // console.log("Booth", this.volunteerByPolingAgent)
    })
  }

  getVolunteerByBoothVolunteer(boothMemberData: any) {
    // console.log(boothMemberData);

    this.showVolunteer = true;
    this.showBoothVolunteer = false;

    this.legislativeService.getVolunteerByBoothMember(boothMemberData.userId).subscribe((response: any) => {
      this.volunteer = response.data;
    })
  }

  getVotersByVolunteer(volunteerData: any) {
    // console.log(volunteerData);

    this.showVoters = true;
    this.showVolunteer = false;

    this.legislativeService.getAllvotersByUserId(volunteerData.userId).subscribe((response: { status: string, message: string, data: any[] }) => {
      this.votersList = response.data;
    });
  }

  


  // showLedgend = true;
  // showDistrictAdmin = false;
  // showAssemblyVolunteer = false;
  // showPollingVolunteer = false;
  // showBoothVolunteer = false;
  // showVolunteer = false;
  // showVoters = false;

  onClickBackButton() {
    if (this.showDistrictAdmin == true) {
      this.showLedgend = true;
      this.showDistrictAdmin= false;
      this.showAssemblyVolunteer = false;
      this.showPollingVolunteer = false;
      this.showBoothVolunteer = false;
      this.showVolunteer = false;
      this.showVoters = false;
    }

    if (this.showAssemblyVolunteer == true){      
      this.showDistrictAdmin= true;
      this.showLedgend = false;
      this.showAssemblyVolunteer = false;
      this.showPollingVolunteer = false;
      this.showBoothVolunteer = false;
      this.showVolunteer = false;
      this.showVoters = false;
    }

    if (this.showPollingVolunteer == true){      
      this.showDistrictAdmin= false;
      this.showLedgend = false;
      this.showAssemblyVolunteer = true;
      this.showPollingVolunteer = false;
      this.showBoothVolunteer = false;
      this.showVolunteer = false;
      this.showVoters = false;
    }

    if (this.showBoothVolunteer == true){      
      this.showDistrictAdmin= false;
      this.showLedgend = false;
      this.showAssemblyVolunteer = false;
      this.showPollingVolunteer = true;
      this.showBoothVolunteer = false;
      this.showVolunteer = false;
      this.showVoters = false;
    }

    if (this.showVolunteer == true){      
      this.showDistrictAdmin= false;
      this.showLedgend = false;
      this.showAssemblyVolunteer = false;
      this.showPollingVolunteer = false;
      this.showBoothVolunteer = true;
      this.showVolunteer = false;
      this.showVoters = false;
    }

    if (this.showVoters == true){      
      this.showDistrictAdmin= false;
      this.showLedgend = false;
      this.showAssemblyVolunteer = false;
      this.showPollingVolunteer = false;
      this.showBoothVolunteer = false;
      this.showVolunteer = true;
      this.showVoters = false;
    }
  }

}
