import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Md5 } from 'ts-md5';
import { User } from '../models/user.model';
import { AreaService } from '../services/area.service';
import { AuthService } from '../services/auth.service';
import { LegendVolunteerService } from '../services/legend-volunteer.service';
import { UserRegistrationService } from '../services/user-registration.service';

@Component({
  selector: 'app-legend-volunteer',
  templateUrl: './legend-volunteer.component.html',
  styleUrls: ['./legend-volunteer.component.scss']
})
export class LegendVolunteerComponent implements OnInit {

  personForm = new UntypedFormGroup({
    id: new UntypedFormControl(null),
    personTypeId: new UntypedFormControl(null, [Validators.required]),
    personName: new UntypedFormControl(null, [Validators.required]),
    age: new UntypedFormControl(''),
    gender: new UntypedFormControl(null, [Validators.required]),
    email: new UntypedFormControl(''),
    district: new UntypedFormControl(null, [Validators.required]),
  });

  confirmation = ['YES', 'NO'];
  cast = ['GENERAL', 'ST', 'SC', 'OBC'];
  religion = ['HINDUISM',
    'CHRISTIANITY',
    'JUDAISM',
    'BUDDHISM',
    'SIKHISM',
    'SHINTO',
    'CATHOLICISM',
    'BAHAI FAITH',
    'ZOROASTRIANISM',
    'JAINISM',
    'CONFUCIANISM',
    'LUTHERANISM',
    'PROTESTANTISM',
    'TAOISM',
    'RASTAFARI',
    'EASTERN ORTHODOX CHURCH',
    'SUNNI ISLAM',
    'CHINESE FOLK RELIGION',
    'BABISM',
    'MODERN PAGANISM',
    'SHIA ISLAM',
    'WICCA',
    'TRADITIONAL AFRICAN RELIGIONS'
  ];
  genderList = ["MALE", "FEMALE", "OTHERS"];

  states: any;

  loggedInUser: User | undefined;

  districtAdmins: any[]=[];
  isUpdateAble = false;


  assemblyVolunteer: any[] = [];
  PolingAgentByAssembly: any[] = [];
  boothVolunteerByPolingAgent: any[] = [];
  volunteer: any[] = [];
  votersList: any[] = [];


  showLedgend = true;
  showDistrictAdmin = true;
  showAssemblyVolunteer = false;
  showPollingVolunteer = false;
  showBoothVolunteer = false;
  showVolunteer = false;
  showVoters = false;



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


  imageSrc: string | ArrayBuffer | null = "";
  imageSrcVoter: string | ArrayBuffer | null = "";
  imageSrcTable: string | ArrayBuffer | null = "";
  defaultPicture: string = "";

  file: File;

  showBill = false;




  constructor(private legendVolunteerService: LegendVolunteerService,
    private areaService: AreaService,
    private authService: AuthService,
  ) {
    // @ts-ignore
    this.file = File;


    // this.loggedInUser = this.authService.userBehaviorSubject.value;

    this.areaService.getStateListener().subscribe((response) => {
      this.states = response;
    });
    this.states = this.areaService.getstate();

    

    if (this.states.length < 2) {
      this.states.id = 1;
    }

  }

  ngOnInit(): void {

    this.loggedInUser = this.authService.userBehaviorSubject.value;
    // console.log(this.loggedInUser);
    this.legendVolunteerService.getDistrictAdminByLegend(this.loggedInUser.uniqueId).subscribe((response) => {
      this.districtAdmins= response.data;
      // console.log(this.districtAdmins);
    });
  }
  clearForms() {
    this.personForm.reset();
    // this.userForm.reset();
    // @ts-ignore
    this.file = File;
    this.isUpdateAble = false;
  }

  onSubmit(): void {

    Swal.fire({
      title: 'Confirmation',
      text: 'Do you sure to create user?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, create It!'
    }).then((result) => {
      if (result.isConfirmed) {
        // tslint:disable-next-line:max-line-length
        // console.log(this.loggedInUser?.uniqueId);return;
        const personFormData = this.personForm.value;
        // const userFormData = this.userForm.value;
        const md5 = new Md5();
        const passwordMd5 = md5.appendStr('1234').end();


        const formData = new FormData();
        // @ts-ignore
        formData.append("personTypeId", 5);
        formData.append("personName", personFormData.personName);
        formData.append("age", personFormData.age);
        formData.append("gender", personFormData.gender);
        formData.append("email", personFormData.email);
        // @ts-ignore
        formData.append("password", passwordMd5);
        // @ts-ignore
        formData.append("parentId", this.loggedInUser?.uniqueId);
        formData.append("districtId", personFormData.district);
        // formData.append("state", personFormData.state);

        // formData.append("file", this.file);

        this.legendVolunteerService.saveNewDistrictAdminByLegend(formData).subscribe(response => {
          if (response.status) {
            const responseData = response.data;
            console.log(response.data);
            // this.voters = response.data;
            this.personForm.reset();
            // this.userForm.reset();

            // @ts-ignore
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'User created',
              showConfirmButton: false,
              timer: 1000
            });
            this.districtAdmins.unshift(response.data);
            // updating terminal balance from here

          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Validation error',
              showConfirmButton: false,
              timer: 3000
            });
          }
        }, (error) => {
          console.log(error);
          // when error occured
          console.log('data saving error', error);
        });
      }
    });
  }

  editVoters(districtAdmin: any) {
    console.log(districtAdmin);
    const dist = districtAdmin.districtId;
    this.personForm.patchValue({
      id: districtAdmin.id,
      personName: districtAdmin.personName,
      age: districtAdmin.age,
      gender: districtAdmin.gender,
      email: districtAdmin.email,
      district: districtAdmin.districtId,
      // remark: districtAdmin.remark,
    });

    this.isUpdateAble = true;
  }

  updateMember() {
    Swal.fire({
      title: 'Confirmation',
      text: 'Do you sure to create user?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, create It!'
    }).then((result) => {
      if (result.isConfirmed) {
        const personFormData = this.personForm.value;
        const md5 = new Md5();
        const passwordMd5 = md5.appendStr('1234').end();


        const masterData = {
          personId: personFormData.id,
          personTypeId: 5,
          personName: personFormData.personName,
          age: personFormData.age,
          gender: personFormData.gender,
          districtId: personFormData.district,

          email: personFormData.email,
          password: passwordMd5,
          parentId: this.loggedInUser?.uniqueId,

        };
        // console.log(masterData);
        // formData.append("state", personFormData.state);
        this.legendVolunteerService.updateDistrictAdminByLegend(masterData).subscribe(response => {

        });

      }
    });
  }

  getAssemblyByDistrictAdmin(districtAdminData: any) {
    // console.log(districtAdminData);
    this.showDistrictAdmin = false;
    this.showAssemblyVolunteer = true;

    this.legendVolunteerService.getAssemblyVolunteerByDistrictAdmin(districtAdminData.id).subscribe((response: any) => {
      this.assemblyVolunteer = response.data;
      // console.log(this.assemblyVolunteer);
    });
  }

  getPollingMemberByAssembly(AssemblyData: any) {
    // console.log(AssemblyData);

    this.showAssemblyVolunteer = false;
    this.showPollingVolunteer = true;

    this.legendVolunteerService.getPolingAgentByAssembly(AssemblyData.id).subscribe((response: any) => {
      this.PolingAgentByAssembly = response.data;
      // console.log("PolingAgentByAssembly", this.PolingAgentByAssembly)
    })
  }

  getBoothVolunteerByPollingMember(pollingMemberData: any) {
    // console.log(pollingMemberData);
    this.showBoothVolunteer = true;
    this.showPollingVolunteer = false;

    this.legendVolunteerService.getBoothByPolingAgent(pollingMemberData.id).subscribe((response: any) => {
      this.boothVolunteerByPolingAgent = response.data;
      // console.log("Booth", this.volunteerByPolingAgent)
    })
  }

  getVolunteerByBoothVolunteer(boothMemberData: any) {
    // console.log(boothMemberData);

    this.showVolunteer = true;
    this.showBoothVolunteer = false;

    this.legendVolunteerService.getVolunteerByBoothMember(boothMemberData.userId).subscribe((response: any) => {
      this.volunteer = response.data;
    })
  }

  getVotersByVolunteer(volunteerData: any) {
    // console.log(volunteerData);

    this.showVoters = true;
    this.showVolunteer = false;

    this.legendVolunteerService.getAllvotersByUserId(volunteerData.userId).subscribe((response: { status: string, message: string, data: any[] }) => {
      this.votersList = response.data;
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
