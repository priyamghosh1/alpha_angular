import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {User} from "../../models/user.model";
import {UserRegistrationService} from "../../services/user-registration.service";
import {AuthService} from "../../services/auth.service";
import Swal from "sweetalert2";
import {Md5} from "ts-md5";
import {PollingMember} from "../../models/PollingMember";
import {GeneralMember} from "../../models/GeneralMember";

@Component({
  selector: 'app-polling-volunteer',
  templateUrl: './polling-volunteer.component.html',
  styleUrls: ['./polling-volunteer.component.scss']
})
export class PollingVolunteerComponent implements OnInit {

  personForm = new UntypedFormGroup({
    id: new UntypedFormControl(null),
    personTypeId: new UntypedFormControl(null, [Validators.required]),
    personName: new UntypedFormControl(null, [Validators.required]),
    email: new UntypedFormControl(null, [Validators.required]),
    // areaId: new FormControl(null, [Validators.required]),
    age: new UntypedFormControl(null),
    gender: new UntypedFormControl(null),
    mobile1: new UntypedFormControl(null),
    mobile2: new UntypedFormControl(null),
    aadharId: new UntypedFormControl(null),
    voterId: new UntypedFormControl(null, [Validators.required]),
    pollingStationId: new UntypedFormControl(null),
    remark: new UntypedFormControl(null)
  });
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
  loggedInUser: User | undefined;
  genderList = [{"id": 1,"name": "male"},{"id":2,"name":"female"},{"id":3,"name":"others"}];
  pollingGeneralMembers: GeneralMember[] = [];

  constructor(
    private userRegistrationService: UserRegistrationService,
    private authService: AuthService,
    private formBuilder: UntypedFormBuilder,
  ) { }

  ngOnInit(): void {
    this.loggedInUser = this.authService.userBehaviorSubject.value;

    this.userRegistrationService.getAllGeneralMembersByPollingId(this.loggedInUser?.uniqueId).subscribe((response: {status:string,message:string,data:GeneralMember[]}) => {
      this.pollingGeneralMembers =  response.data;
    });
    this.userRegistrationService.getAllGeneralMembersByPollingIdListener().subscribe((response: any) => {
      this.pollingGeneralMembers = response;
    });
  }

  onSubmit(): void {
    Swal.fire({
      title: 'Confirmation',
      text: 'Do you sure to create member?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, create It!'
    }).then((result) => {
      if (result.isConfirmed){
        // tslint:disable-next-line:max-line-length
        // console.log(this.loggedInUser?.uniqueId);return;
        const personFormData = this.personForm.value;
        const userFormData = this.userForm.value;
        const md5 = new Md5();
        const passwordMd5 = md5.appendStr('1234').end();
        const masterData = {
          personTypeId: 5,
          personName: personFormData.personName,
          age: personFormData.age,
          gender: personFormData.gender,
          // email: this.loggedInUser?.uniqueId,
          email: personFormData.email,
          password: passwordMd5,
          mobile1: personFormData.mobile1,
          mobile2: personFormData.mobile2,
          voterId: personFormData.voterId,
          pollingStationId: personFormData.pollingStationId,
          parentId: this.loggedInUser?.uniqueId,
          remark: userFormData.remark,
          areaDescription: userFormData.areaDescription
        };
        this.userRegistrationService.savePollingGeneralMember(masterData).subscribe(response => {
          // console.log(response);
          if (response.status){
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

          }else{
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
