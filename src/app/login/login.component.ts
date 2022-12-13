import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Md5} from "ts-md5";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  assemblyData: any = '';
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {

    const routerState = this.router.getCurrentNavigation();
    if(routerState?.extras.state){
      this.assemblyData = routerState.extras.state;
    }
  }
  hide: boolean = true;
  ngOnInit(): void {
    this.loginForm=new FormGroup({
      loginId : new FormControl('',[Validators.required,Validators.email]),
      loginPassword : new FormControl('',[Validators.required,Validators.minLength(6)])
    })
  }
  login(){
    if (!this.loginForm.valid) {
      // return;
    }
    // console.log(this.loginForm.value);
    // converting password to MD5
    console.log(this.assemblyData);
    let loginType = 'others';
    if(this.assemblyData!=''){
      console.log(this.assemblyData.assembly.assemblyId);
      this.loginForm.patchValue({loginId: this.assemblyData.assembly.assemblyId});
      loginType = 'admin';
    }
    const md5 = new Md5();
    const passwordMd5 = md5.appendStr(this.loginForm.value.loginPassword).end();

    let loginData = {loginId: this.loginForm.value.loginId,loginPassword: passwordMd5, loginType: loginType};

    // const formPassword = form.value.password;
    this.authService.login(loginData).subscribe(response => {
      if (response.status === true){
        if (this.authService.isOwner()){
          this.router.navigate(['/mp']).then(r => {});
        }
        if (this.authService.isDeveloper()){
          this.router.navigate(['/developer']).then(r => {});
        }
        if (this.authService.isLegislativeCandidate()){
          this.router.navigate(['/legislative']).then(r => {});
        }
        if (this.authService.isPollingStationVolunteer()){
          this.router.navigate(['/pollingVolunteer']).then(r => {});
        }
      }
    });

  }

}
