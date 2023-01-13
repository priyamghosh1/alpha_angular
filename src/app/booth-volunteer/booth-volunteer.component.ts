import { Component, OnInit } from '@angular/core';

import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Md5 } from 'ts-md5';
import { PollingMember } from '../models/PollingMember';
import { User } from '../models/user.model';
import { AreaService } from '../services/area.service';
import { AuthService } from '../services/auth.service';
import { PollingStationService } from '../services/polling-station.service';
import { UserRegistrationService } from '../services/user-registration.service';
import * as XLSX from 'xlsx';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-booth-volunteer',
  templateUrl: './booth-volunteer.component.html',
  styleUrls: ['./booth-volunteer.component.scss']
})
export class BoothVolunteerComponent implements OnInit {

  showBill = false;
  isLinear = false;
  genderList = ["MALE", "FEMALE",  "OTHERS"];
  isUpdateAble = false;
  states: any;
  voters: any;




  imageSrc: string | ArrayBuffer | null = "";
  imageSrcVoter: string | ArrayBuffer | null = "";
  imageSrcTable: string | ArrayBuffer | null = "";
  defaultPicture: string = "";

  // @ts-ignore
  file: File;

  userForm = new UntypedFormGroup({
    id: new UntypedFormControl(null),
    personId: new UntypedFormControl(null, [Validators.required]),
    parentId: new UntypedFormControl(null, [Validators.required]),
    areaId: new UntypedFormControl(null),
    remark: new UntypedFormControl(null, [Validators.required]),
    areaDescription: new UntypedFormControl(null, [Validators.required]),
    email: new UntypedFormControl(null, [Validators.required]),
    password: new UntypedFormControl(null, [Validators.required]),
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

  volunteer: any[]=[];


  personForm = new UntypedFormGroup({
    // id: new UntypedFormControl(null),
    personTypeId: new UntypedFormControl(null, [Validators.required]),
    personName: new UntypedFormControl(null, [Validators.required]),
    email: new UntypedFormControl(''),
    guardianName: new UntypedFormControl(''),
    religion: new UntypedFormControl(''),
    occupation: new UntypedFormControl(''),
    policeStation: new UntypedFormControl(''),
    cast: new UntypedFormControl(''),
    partNo: new UntypedFormControl(''),
    postOffice: new UntypedFormControl(''),
    houseNo: new UntypedFormControl(''),
    // state: new FormControl(''),
    district: new UntypedFormControl(''),
    pinCode: new UntypedFormControl(''),
    preferableCandidate: new UntypedFormControl(''),
    suggestion: new UntypedFormControl(''),
    prevVotingHistory: new UntypedFormControl(null, [Validators.required]),
    satisfiedByPresentGov: new UntypedFormControl(null, [Validators.required]),
    age: new UntypedFormControl(''),
    gender: new UntypedFormControl(null, [Validators.required]),
    mobile1: new UntypedFormControl('', [Validators.required]),
    mobile2: new UntypedFormControl(''),
    aadharId: new UntypedFormControl('', [Validators.required]),
    roadName: new UntypedFormControl(null),
    voterId: new UntypedFormControl(''),
    pollingStationId: new UntypedFormControl(''),
    // remark: new FormControl(null),
  });
  pollingStations: any;
  pollingMembers: PollingMember[] = [];
  loggedInUser: User | undefined;
  // public assemblyConstituencyId: number;
  private BASE_PUBLIC_URL = environment.BASE_PUBLIC_URL;

  constructor(
    private areaService: AreaService,
    private pollingStationService: PollingStationService,
    private authService: AuthService,
    private userRegistrationService: UserRegistrationService,
  ) {
    this.areaService.getStateListener().subscribe((response) => {
      this.states = response;
    });
    this.states = this.areaService.getstate();



    this.defaultPicture = this.BASE_PUBLIC_URL + '/profile_pic/no_dp.png';
    this.imageSrcVoter = this.BASE_PUBLIC_URL + '/voter_pic/';
  }

  ngOnInit(): void {

    this.showBill = false;

    this.loggedInUser = this.authService.userBehaviorSubject.value;
    this.pollingStationService.getPollingStationByAssemblyId(this.loggedInUser?.assemblyConstituencyId).subscribe((response: {
      status: boolean,
      message: string, data: any
    }) => {
      this.pollingStations = response.data;
    });

    this.userRegistrationService.getVolunteerByPolingAgent(this.loggedInUser.uniqueId).subscribe((response: any) => {
      this.volunteer = response.data;
      console.log("PolingAgentByAssembly", this.volunteer)
    })
  }
  printDivStyle = {
    printDiv: { marginRight: '3px', marginLeft: '3px', marginTop: '5px' },
    table: { 'border-collapse': 'collapse', width: '100%' },
    label: { width: '100%' },
    div: { border: '1px  solid black' }
  };

  exportexcel(): void {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'test.xlsx');

  }

  clearForms() {
    this.personForm.reset();
    this.userForm.reset();
    // @ts-ignore
    this.file = File;
    this.isUpdateAble = false;
  }

  onSubmitVolunteer(): void {

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
        const userFormData = this.userForm.value;
        const md5 = new Md5();
        const passwordMd5 = md5.appendStr('1234').end();
        // const masterData = {
        //   personTypeId: 3,
        //   personName: personFormData.personName,
        //   age: personFormData.age,
        //   gender: personFormData.gender,
        //   // email: this.loggedInUser?.uniqueId,
        //
        //
        //   // religion: new FormControl(null, [Validators.required]),
        //   religion: personFormData.religion,
        //   occupation: personFormData.occupation,
        //   policeStation: personFormData.policeStation,
        //   cast: personFormData.cast,
        //   partNo: personFormData.partNo,
        //   postOffice: personFormData.postOffice,
        //   houseNo: personFormData.houseNo,
        //   guardianName: personFormData.guardianName,
        //   aadharId: personFormData.aadharId,
        //
        //   state: personFormData.state,
        //   district: personFormData.district,
        //   pinCode: personFormData.pinCode,
        //   preferableCandidate: personFormData.preferableCandidate,
        //   satisfiedByPresentGov: personFormData.satisfiedByPresentGov,
        //   suggestion: personFormData.suggestion,
        //   previousVotingHistory: personFormData.prevVotingHistory,
        //
        //   email: personFormData.email,
        //   password: passwordMd5,
        //   mobile1: personFormData.mobile1,
        //   mobile2: personFormData.mobile2,
        //   voterId: personFormData.voterId,
        //   pollingStationId: personFormData.pollingStationId,
        //   parentId: this.loggedInUser?.uniqueId,
        //   remark: this.userForm.value.remark,
        //   roadName: personFormData.roadName,
        //
        // };

        const formData = new FormData();
        // @ts-ignore
        formData.append("personTypeId", 9);
        formData.append("personName", personFormData.personName);
        formData.append("age", personFormData.age);
        formData.append("gender", personFormData.gender);
        formData.append("religion", personFormData.religion);
        formData.append("occupation", personFormData.occupation);
        formData.append("policeStation", personFormData.policeStation);
        formData.append("cast", personFormData.cast);
        formData.append("partNo", personFormData.partNo);
        formData.append("postOffice", personFormData.postOffice);
        formData.append("houseNo", personFormData.houseNo);
        formData.append("guardianName", personFormData.guardianName);
        formData.append("district", personFormData.district);
        formData.append("pinCode", personFormData.pinCode);
        formData.append("preferableCandidate", personFormData.preferableCandidate);
        formData.append("satisfiedByPresentGov", personFormData.satisfiedByPresentGov);
        formData.append("suggestion", personFormData.suggestion);
        formData.append("previousVotingHistory", personFormData.prevVotingHistory);
        formData.append("email", personFormData.email);
        formData.append("aadharId", personFormData.aadharId);
        // @ts-ignore
        formData.append("password", passwordMd5);
        formData.append("mobile1", personFormData.mobile1);
        formData.append("mobile2", personFormData.mobile2);
        formData.append("voterId", personFormData.voterId);
        formData.append("pollingStationId", personFormData.pollingStationId);
        // @ts-ignore
        formData.append("parentId", this.loggedInUser?.uniqueId);
        formData.append("remark", this.userForm.value.remark);
        formData.append("roadName", personFormData.roadName);
        formData.append("district", personFormData.district);
        // formData.append("state", personFormData.state);

        // formData.append("file", this.file);

        this.userRegistrationService.saveNewVolunteer(formData).subscribe(response => {
          if (response.status) {
            const responseData = response.data;
            // this.voters = response.data;
            this.personForm.reset();
            this.userForm.reset();
            // @ts-ignore
            this.file = File;
            this.imageSrc = null;
            // @ts-ignore
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'User created',
              showConfirmButton: false,
              timer: 1000
            });
            this.volunteer.unshift(response.data);
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
        // tslint:disable-next-line:max-line-length
        // console.log(this.loggedInUser?.uniqueId);return;
        const personFormData = this.personForm.value;
        const userFormData = this.userForm.value;
        const md5 = new Md5();
        const passwordMd5 = md5.appendStr('1234').end();
        const masterData = {
          personId: personFormData.id,
          personTypeId: 6,
          personName: personFormData.personName,
          age: personFormData.age,
          gender: personFormData.gender,
          // email: this.loggedInUser?.uniqueId,


          // religion: new FormControl(null, [Validators.required]),
          religion: personFormData.religion,
          occupation: personFormData.occupation,
          policeStation: personFormData.policeStation,
          cast: personFormData.cast,
          partNo: personFormData.partNo,
          postOffice: personFormData.postOffice,
          houseNo: personFormData.houseNo,
          guardianName: personFormData.guardianName,
          aadharId: personFormData.aadharId,

          state: personFormData.state,
          district: personFormData.district,
          pinCode: personFormData.pinCode,
          preferableCandidate: personFormData.preferableCandidate,
          satisfiedByPresentGov: personFormData.satisfiedByPresentGov,
          suggestion: personFormData.suggestion,
          previousVotingHistory: personFormData.prevVotingHistory,

          email: personFormData.email,
          password: passwordMd5,
          mobile1: personFormData.mobile1,
          mobile2: personFormData.mobile2,
          voterId: personFormData.voterId,
          pollingStationId: personFormData.pollingStationId,
          parentId: this.loggedInUser?.uniqueId,
          remark: this.userForm.value.remark,
          roadName: personFormData.roadName,

        };
        // formData.append("state", personFormData.state);
        this.userRegistrationService.updateExistingUser(masterData).subscribe(response => {

        });

      }
    });
  }

  editVoters(voter: any) {
    // console.log(voter);
    this.personForm.patchValue({
      id: voter.id,
      personName: voter.personName,
      age: voter.age,
      gender: voter.gender,
      email: voter.email,
      religion: voter.religion,
      occupation: voter.occupation,
      policeStation: voter.policeStation,
      cast: voter.cast,
      partNo: voter.partNo,
      postOffice: voter.postOffice,
      houseNo: voter.houseNo,
      guardianName: voter.guardianName,
      aadharId: voter.aadharId,
      state: voter.state,
      district: voter.districtId,
      pinCode: voter.pinCode,
      preferableCandidate: voter.preferableCandidate,
      satisfiedByPresentGov: voter.satisfiedByPresentGov,
      suggestion: voter.suggestion,
      prevVotingHistory: voter.previousVotingHistory,
      password: voter.password,
      mobile1: voter.mobile1,
      mobile2: voter.mobile2,
      voterId: voter.voterId,
      pollingStationId: voter.pollingStationId,
      parentId: voter.parentId,
      remark: voter.remark,
      roadName: voter.roadName,
    });
    console.log(voter);
    this.imageSrc = this.imageSrcVoter + '' + voter.id + '.jpg'

    // this.onchange(this.imageSrc);

    // var reader = new FileReader();
    // reader.readAsDataURL(tempImg);
    // reader.onload = (_event) => {
    //   this.imageSrc = reader.result;
    // }

    this.isUpdateAble = true;
  }

  onChange(event: Event) {

    // @ts-ignore
    if ((event.target.files[0].size / (1024 * 1000)) > 2) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Photo must be less than 2 mb',
        showConfirmButton: false,
        timer: 3000
      });
      // @ts-ignore
      this.file = File;
      return;
    }
    // @ts-ignore
    this.file = event.target.files[0];

    var reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = (_event) => {
      this.imageSrc = reader.result;
    }
  }

  viewBill() {
    this.showBill = !this.showBill;
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
