import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { AreaService } from 'src/app/services/area.service';
import { UserRegistrationService } from 'src/app/services/user-registration.service';
import { Area } from 'src/app/models/area.model';
import Swal from 'sweetalert2';
import { Md5 } from "ts-md5";
import { User } from "../../models/user.model";
import { AuthService } from "../../services/auth.service";
import { PollingStationService } from "../../services/polling-station.service";
import { AssemblyService } from 'src/app/services/assembly.service';
import { PollingMember } from "../../models/PollingMember";
import { HttpClient } from '@angular/common/http';
import {CommonService} from "../../services/common.service";




@Component({
  selector: 'app-mp-level',
  templateUrl: './mp-level.component.html',
  styleUrls: ['./mp-level.component.scss']
})
export class MpLevelComponent implements OnInit {
  voter: any;
  voters:any;
  public highLightedRowIndex = -1;

  // personFormImp = this._formBuilder.group({
  //   id: [null],
  //   personName: [null, Validators.required],
  //   guardianName: [null, Validators.required],
  //   age: [null, Validators.required],
  //   gender: [null, Validators.required],
  //   houseNo: [null, Validators.required],
  //   roadName: [null, Validators.required],
  //   voterId: [null, Validators.required],
  //   mobile1: [null, Validators.required],
  //   state: [null, Validators.required],
  //   district: [null, Validators.required],
  //   religion: [null, Validators.required],
  //   occuption: [null, Validators.required],
  //   aadharId: [null, Validators.required],
  // });
  // personFormSecond = this._formBuilder.group({
  //   personTypeId: [''],
  //   email: [''],
  //   policeStation: [''],
  //   cast: [''],
  //   partNo: [''],
  //   postOffice: [''],
  //   pinCode: [''],
  //   preferableCandidate: [''],
  //   suggestion: [''],
  //   prevVotingHistory: [''],
  //   satisfiedByPresentGov: [''],
  //   mobile2: [''],
  //   pollingStationId: [''],
  // });
  isLinear = false;

  confirmation = ['yes', 'no'];
  cast = ['General', 'ST', 'SC', 'OBC'];
  religion = ['Hinduism',
              'Christianity',
              'Judaism',
              'Buddhism',
              'Sikhism',
              'Shinto',
              'Catholicism',
              'Bahai Faith',
              'Zoroastrianism',
              'Jainism',
              'Confucianism',
              'Lutheranism',
              'Protestantism',
              'Taoism',
              'Rastafari',
              'Eastern Orthodox Church',
              'Sunni Islam',
              'Chinese Folk Religion',
              'Babism',
              'Modern Paganism',
              'Shia Islam',
              'Wicca',
              'Traditional African Religions'
            ];

  states: any;


  // items = this.cartService.getItems();

  personForm = new FormGroup({
    id: new FormControl(null),
    personTypeId: new FormControl(null, [Validators.required]),
    personName: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required]),
    guardianName: new FormControl(null, [Validators.required]),
    religion: new FormControl(null, [Validators.required]),
    occupation: new FormControl(null, [Validators.required]),
    policeStation: new FormControl(null, [Validators.required]),
    cast: new FormControl(null, [Validators.required]),
    partNo: new FormControl(null, [Validators.required]),
    postOffice: new FormControl(null, [Validators.required]),
    houseNo: new FormControl(null, [Validators.required]),
    state: new FormControl(null, [Validators.required]),
    district: new FormControl(null, [Validators.required]),
    pinCode: new FormControl(null, [Validators.required]),
    preferableCandidate: new FormControl(null, [Validators.required]),
    suggestion: new FormControl(null, [Validators.required]),
    prevVotingHistory: new FormControl(null, [Validators.required]),
    satisfiedByPresentGov: new FormControl(null, [Validators.required]),
    age: new FormControl(null, [Validators.required]),
    gender: new FormControl(null, [Validators.required]),
    mobile1: new FormControl(null, [Validators.required]),
    mobile2: new FormControl(null),
    aadharId: new FormControl(null, [Validators.required]),
    roadName: new FormControl(null),
    voterId: new FormControl(null, [Validators.required]),
    pollingStationId: new FormControl(null, [Validators.required]),
    // remark: new FormControl(null),
  });

  userForm = new FormGroup({
    id: new FormControl(null),
    personId: new FormControl(null, [Validators.required]),
    parentId: new FormControl(null, [Validators.required]),
    areaId: new FormControl(null),
    remark: new FormControl(null, [Validators.required]),
    areaDescription: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });
  //

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


  areas: Area[] = [];
  pollingMembers: PollingMember[] = [];
  loggedInUser: User | undefined;
  pollingStations: any;
  imageSrc: string | ArrayBuffer | null ="";
  imageSrcVoter: string | ArrayBuffer | null ="";
  imageSrcTable: string | ArrayBuffer | null ="";
  defaultPicture: string = "";
  // genderList = [{ "id": 1, "name": "male" }, { "id": 2, "name": "female" }, { "id": 3, "name": "others" }];
  genderList = ["male", "female",  "others" ];
  file: File;


  constructor(
    private userRegistrationService: UserRegistrationService,
    private authService: AuthService,
    private pollingStationService: PollingStationService,
    private formBuilder: FormBuilder,
    private areaService: AreaService,
    private http: HttpClient,
    private _formBuilder: FormBuilder,
    private commonService: CommonService
  ) {

    // @ts-ignore
    this.file = File;

    this.areaService.getStateListener().subscribe((response) => {
      this.states = response;
    });
    this.states = this.areaService.getstate();

    this.defaultPicture = this.commonService.getPublic() + '/profile_pic/no_dp.png';
    this.imageSrcVoter = this.commonService.getPublic() + '/voter_pic/';

    // const user = localStorage.getItem('user');
    // if (user){
    //   const localUserID = JSON.parse(<string>user).uniqueId;
    //   this.imageSrc = this.commonService.getPublic() + '/voter_pic/' + localUserID + '.jpg';
    // }

    // private cartService: CartService,

    if(this.states.length<2){
      this.states.id=1;
    }

    // const userData: User = JSON.parse(<string>localStorage.getItem('user'));
    // console.log(userData);

  }



  ngOnInit(): void {



    this.areas = this.areaService.getArea();
    this.areaService.getGameTypeListener().subscribe((response: Area[]) => {
      this.areas = response;
    });

    this.areaService.getStateListener().subscribe((response) => {
      this.states = response;
    });
    this.states = this.areaService.getstate();

    this.loggedInUser = this.authService.userBehaviorSubject.value;
    this.pollingStationService.getPollingStationByAssemblyId(this.loggedInUser?.assemblyConstituencyId).subscribe((response: {
      status: boolean,
      message: string, data: any
    }) => {
      this.pollingStations = response.data;
    });


    this.userRegistrationService.getAllPersonByAssemblyId(this.loggedInUser?.assemblyConstituencyId).subscribe((response: { status: string, message: string, data: PollingMember[] }) => {
      this.pollingMembers = response.data;
    });
    this.userRegistrationService.getAllPersonByAssemblyIdListener().subscribe((response: any) => {
      this.pollingMembers = response;
    });

    // this.http.get(this.BASE_API_URL   + '/states' ).subscribe((response) => {
    //   this.states = response;
    //   console.log(this.states);
    // });




  }

  onChange(event: Event){

    // @ts-ignore
    if((event.target.files[0].size/(1024*1000)) > 2){
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
    // console.log(this.file);

    var reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = (_event) => {
      // this.msg = "";
      this.imageSrc = reader.result;
    }
    // this.imageSrc = reader.result;
  }

  getAllArea() {
    this.areas = this.areaService.getArea();
    this.areaService.getGameTypeListener().subscribe((response: Area[]) => {
      this.areas = response;
    });
  }


  // getAllState() {
  //   this.states = this.areaService.getstate();
  //   this.areaService.getStateListener().subscribe((response) => {
  //     this.states = response;
  //     console.log(this.states);
  //   });
  // }

  onSubmit(): void {

    if(!this.file.size){
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Upload Photo',
        showConfirmButton: false,
        timer: 3000
      });
      return;
    }

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
        formData.append("personTypeId", 3);
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
        formData.append("state", personFormData.state);

        formData.append("file", this.file);



        console.log("test",formData);
        // return;
        // console.log(masterData);
        this.userRegistrationService.saveNewUser(formData).subscribe(response => {
          if (response.status) {
            const responseData = response.data;
            this.voters=response.data;
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

  // personTypeId: 3,
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

  editVoters(voter: any){
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
      previousVotingHistory: voter.previousVotingHistory,
      password: voter.password,
      mobile1: voter.mobile1,
      mobile2: voter.mobile2,
      voterId: voter.voterId,
      pollingStationId: voter.pollingStationId,
      parentId: voter.parentId,
      remark: voter.remark,
      roadName: voter.roadName,
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
