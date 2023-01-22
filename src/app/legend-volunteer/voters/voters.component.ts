import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AssemblyAdminService } from 'src/app/services/assembly-admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { LegendVolunteerService } from 'src/app/services/legend-volunteer.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-voters',
  templateUrl: './voters.component.html',
  styleUrls: ['./voters.component.scss']
})
export class VotersComponent implements OnInit {
  loggedInUser: User | undefined;
  votersList: any[]=[];
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

  constructor(private legendVolunteerService: LegendVolunteerService,
    private authService: AuthService, 
    private assemblyAdminService: AssemblyAdminService,  ) { }

  ngOnInit(): void {

    this.loggedInUser = this.authService.userBehaviorSubject.value;
    console.log(this.loggedInUser);

    this.legendVolunteerService.getvotersByLegend(this.loggedInUser?.uniqueId).subscribe((response: { status: string, message: string, data: any[] }) => {
      this.votersList = response.data;
      console.log(this.votersList);
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

}
