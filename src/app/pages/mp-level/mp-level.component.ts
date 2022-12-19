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




@Component({
  selector: 'app-mp-level',
  templateUrl: './mp-level.component.html',
  styleUrls: ['./mp-level.component.scss']
})
export class MpLevelComponent implements OnInit {

  confirmation = ['yes', 'no'];
  states : any;


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
    district: new FormControl(null, [Validators.required]),
    pinCode: new FormControl(null, [Validators.required]),
    preferableCandidate: new FormControl(null, [Validators.required]),
    suggestion: new FormControl(null, [Validators.required]),
    prevVotingHistory: new FormControl(null, [Validators.required]),
    satisfiedByPresentGov: new FormControl(null, [Validators.required]),
    age: new FormControl(null),
    gender: new FormControl(null),
    mobile1: new FormControl(null),
    mobile2: new FormControl(null),
    aadharId: new FormControl(null),
    voterId: new FormControl(null, [Validators.required]),
    pollingStationId: new FormControl(null),
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

  showName = true;
  areas: Area[] = [];
  pollingMembers: PollingMember[] = [];
  loggedInUser: User | undefined;
  pollingStations: any;
  genderList = [{ "id": 1, "name": "male" }, { "id": 2, "name": "female" }, { "id": 3, "name": "others" }];


  constructor(
    private userRegistrationService: UserRegistrationService,
    private authService: AuthService,
    private pollingStationService: PollingStationService,
    private formBuilder: FormBuilder,
    private areaService: AreaService,
    private  http: HttpClient, 
  ) {
    // private cartService: CartService,

  }



  ngOnInit(): void {
    this.areas = this.areaService.getArea();
    this.areaService.getGameTypeListener().subscribe((response: Area[]) => {
      this.areas = response;
    });
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
  getAllArea() {
    this.areas = this.areaService.getArea();
    this.areaService.getGameTypeListener().subscribe((response: Area[]) => {
      this.areas = response;
    });
  }

<<<<<<< HEAD

  // getAllState() {
  //   this.states = this.areaService.getstate();
  //   this.areaService.getStateListener().subscribe((response) => {
  //     this.states = response;
  //   });
  // }
=======
  changeShowStatus(x: any, y: any){
    this.showName = x === 'showName' ? y : this.showName;
  }
>>>>>>> ad91133bd934b5c313051f2567a20383ff009f15

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
        const userFormData = this.userForm.value;
        const md5 = new Md5();
        const passwordMd5 = md5.appendStr('1234').end();
        const masterData = {
          personTypeId: 3,
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

        };
        // console.log(masterData);
        // return;
        this.userRegistrationService.saveNewUser(masterData).subscribe(response => {
          console.log(response);
          if (response.status) {
            const responseData = response.data;
            this.personForm.reset();
            this.userForm.reset();
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


}
