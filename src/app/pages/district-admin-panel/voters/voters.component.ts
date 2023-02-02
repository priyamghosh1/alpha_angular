import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AreaService } from 'src/app/services/area.service';
import { AuthService } from 'src/app/services/auth.service';
import { DistrictAdminService } from 'src/app/services/district-admin.service';
import { PollingStationService } from 'src/app/services/polling-station.service';
import { UserRegistrationService } from 'src/app/services/user-registration.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-voters',
  templateUrl: './voters.component.html',
  styleUrls: ['./voters.component.scss']
})
export class VotersComponent implements OnInit {

  pollingStations: any;
  // pollingMembers: PollingMember[] = [];
  loggedInUser: User | undefined;
  // public assemblyConstituencyId: number;
  private BASE_PUBLIC_URL = environment.BASE_PUBLIC_URL;


  PolingAgentByAssembly: any[] = [];
  boothVolunteerByPolingAgent: any[] = [];
  volunteer: any[] = [];
  votersList: any[] = [];


  showAssemblyVolunteer = true;
  showPollingVolunteer = false;
  showBoothVolunteer = false;
  showVolunteer = false;
  showVoters = false;

  voters: any;
  assemblyVolunteer: any[]=[];



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





  imageSrc: string | ArrayBuffer | null ="";
  imageSrcVoter: string | ArrayBuffer | null ="";
  imageSrcTable: string | ArrayBuffer | null ="";
  defaultPicture: string = "";

  // @ts-ignore
  file: File;
  assembly: any[]=[];



  constructor(private areaService: AreaService,
    private pollingStationService: PollingStationService,
      private authService: AuthService,
      private userRegistrationService: UserRegistrationService,
       private districtAdminService: DistrictAdminService) { }

  ngOnInit(): void {

    this.loggedInUser = this.authService.userBehaviorSubject.value;

    this.userRegistrationService.getAssemblyVolunteerByDistrictAdmin(this.loggedInUser.uniqueId).subscribe((response : any) =>{
      this.assemblyVolunteer = response.data;
      // console.log(this.assemblyVolunteer);
    });

    this.areaService.getAssemblyByDistrictId(this.loggedInUser.districtId).subscribe((response: any)=>{
      this.assembly = response.data;
      // console.log("asembly", this.assembly);
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

  getPollingMemberByAssembly(assemblyData: any){
    this.showAssemblyVolunteer = false;
    this.showPollingVolunteer = true;

    this.districtAdminService.getPolingAgentByAssembly(assemblyData.id).subscribe((response: any) => {
      this.PolingAgentByAssembly = response.data;
    })
  }

  getBoothVolunteerByPollingMember(pollingMemberData: any) {
    // console.log(pollingMemberData);
    this.showBoothVolunteer = true;
    this.showPollingVolunteer = false;

    this.districtAdminService.getBoothByPolingAgent(pollingMemberData.id).subscribe((response: any) => {
      this.boothVolunteerByPolingAgent = response.data;
      // console.log("Booth", this.volunteerByPolingAgent)
    })
  }

  getVolunteerByBoothVolunteer(boothMemberData: any) {
    // console.log(boothMemberData);

    this.showVolunteer = true;
    this.showBoothVolunteer = false;

    this.districtAdminService.getVolunteerByBoothMember(boothMemberData.userId).subscribe((response: any) => {
      this.volunteer = response.data;
    })
  }

  getVotersByVolunteer(volunteerData: any) {
    // console.log(volunteerData);

    this.showVoters = true;
    this.showVolunteer = false;

    this.districtAdminService.getAllvotersByUserId(volunteerData.userId).subscribe((response: { status: string, message: string, data: any[] }) => {
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
    // if (this.showDistrictAdmin == true) {
    //   this.showLedgend = true;
    //   this.showDistrictAdmin= false;
    //   this.showAssemblyVolunteer = false;
    //   this.showPollingVolunteer = false;
    //   this.showBoothVolunteer = false;
    //   this.showVolunteer = false;
    //   this.showVoters = false;
    // }

    if (this.showAssemblyVolunteer == true){      
      // this.showDistrictAdmin= true;
      // this.showLedgend = false;
      this.showAssemblyVolunteer = false;
      this.showPollingVolunteer = false;
      this.showBoothVolunteer = false;
      this.showVolunteer = false;
      this.showVoters = false;
    }

    if (this.showPollingVolunteer == true){      
      // this.showDistrictAdmin= false;
      // this.showLedgend = false;
      this.showAssemblyVolunteer = true;
      this.showPollingVolunteer = false;
      this.showBoothVolunteer = false;
      this.showVolunteer = false;
      this.showVoters = false;
    }

    if (this.showBoothVolunteer == true){      
      // this.showDistrictAdmin= false;
      // this.showLedgend = false;
      this.showAssemblyVolunteer = false;
      this.showPollingVolunteer = true;
      this.showBoothVolunteer = false;
      this.showVolunteer = false;
      this.showVoters = false;
    }

    if (this.showVolunteer == true){      
      // this.showDistrictAdmin= false;
      // this.showLedgend = false;
      this.showAssemblyVolunteer = false;
      this.showPollingVolunteer = false;
      this.showBoothVolunteer = true;
      this.showVolunteer = false;
      this.showVoters = false;
    }

    if (this.showVoters == true){      
      // this.showDistrictAdmin= false;
      // this.showLedgend = false;
      this.showAssemblyVolunteer = false;
      this.showPollingVolunteer = false;
      this.showBoothVolunteer = false;
      this.showVolunteer = true;
      this.showVoters = false;
    }
  }

}
