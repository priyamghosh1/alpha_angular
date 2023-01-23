import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {PollingMember} from "../../models/PollingMember";
import {User} from "../../models/user.model";
import {UserRegistrationService} from "../../services/user-registration.service";
import {AuthService} from "../../services/auth.service";
import {PollingStationService} from "../../services/polling-station.service";
import {AreaService} from "../../services/area.service";
import Swal from "sweetalert2";
import {Md5} from "ts-md5";
import {PollingVolunteer} from "../../models/PollingVolunteer";
import { LegislativeService } from 'src/app/services/legislative.service';

@Component({
  selector: 'app-legislative',
  templateUrl: './legislative.component.html',
  styleUrls: ['./legislative.component.scss']
})
export class LegislativeComponent implements OnInit {
  personForm = new UntypedFormGroup({
    id: new UntypedFormControl(null),
    personTypeId: new UntypedFormControl(null, [Validators.required]),
    personName: new UntypedFormControl(null, [Validators.required]),
    age: new UntypedFormControl(''),
    gender: new UntypedFormControl(null, [Validators.required]),
    email: new UntypedFormControl(''),
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

  legengVolunteers: any[]=[];
  isUpdateAble = false;


  constructor(private authService: AuthService, private legislativeService: LegislativeService) { }

  ngOnInit(): void {
    this.loggedInUser = this.authService.userBehaviorSubject.value;   

    this.legislativeService.getLegendByLegislative(this.loggedInUser.uniqueId).subscribe((response) => {
      this.legengVolunteers= response.data;
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
        formData.append("personTypeId", 4);
        formData.append("personName", personFormData.personName);
        formData.append("age", personFormData.age);
        formData.append("gender", personFormData.gender);
        formData.append("email", personFormData.email);
        // @ts-ignore
        formData.append("password", passwordMd5);
        // @ts-ignore
        formData.append("parentId", this.loggedInUser?.uniqueId);
        // formData.append("districtId", personFormData.district);
        // formData.append("state", personFormData.state);

        // formData.append("file", this.file);

        this.legislativeService.saveNewLegendByLegislative(formData).subscribe(response => {
          if (response.status) {
            const responseData = response.data;
            // console.log(response.data);
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
            this.legengVolunteers.unshift(response.data);
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

  editVoters(legend: any) {
    // console.log(legend);
    // const dist = legend.districtId;
    this.personForm.patchValue({
      id: legend.id,
      personName: legend.personName,
      age: legend.age,
      gender: legend.gender,
      email: legend.email,
      // district: districtAdmin.districtId,
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
          personTypeId: 4,
          personName: personFormData.personName,
          age: personFormData.age,
          gender: personFormData.gender,
          // districtId: personFormData.district,

          email: personFormData.email,
          password: passwordMd5,
          parentId: this.loggedInUser?.uniqueId,

        };
        // console.log(masterData);
        // formData.append("state", personFormData.state);
        this.legislativeService.updateLegendByLegislative(masterData).subscribe(response => {

        });

      }
    });
  }


  

}
