import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {BehaviorSubject, Subject, throwError} from 'rxjs';
import {Router} from '@angular/router';
// global.ts file is created in shared folder to store all global variables.
import {User} from '../models/user.model';
import {environment} from '../../environments/environment';
import {ErrorService} from './error.service';
import {CommonService} from "./common.service";
import { Observable } from 'rxjs';

export interface AuthResponseData {
  status: boolean;
  message: string;
  data: {
    uniqueId: number;
    userName: string;
    userTypeId: number;
    userTypeName: string;
    token: string;
    assemblyConstituencyId: number;
  };
}


@Injectable({
  providedIn: 'root'
})
// @ts-ignore
export class AuthService {
  private BASE_API_URL = environment.BASE_API_URL;

  // @ts-ignore
  userBehaviorSubject = new BehaviorSubject<User>(null);
  constructor(private commonService: CommonService , private  http: HttpClient, private router: Router, private errorService: ErrorService) { }


  getUserBehaviorSubjectListener(){
    return this.userBehaviorSubject;
  }
  isAuthenticated(){
    if (this.userBehaviorSubject.value){
      return true;
    }else{
      return false;
    }
  }
  isNotAuthenticated(){
    if (this.userBehaviorSubject.value){
      return false;
    }else{
      return true;
    }
  }
  isOwner(){
    if (this.userBehaviorSubject.value && this.userBehaviorSubject.value.isOwner){
      return true;
    }else{
      return false;
    }
  }
  isLegislativeCandidate(){
    if (this.userBehaviorSubject.value && this.userBehaviorSubject.value.isLegislativeCandidate){
      return true;
    }else{
      return false;
    }
  }

  isLegendPanel(){
    if (this.userBehaviorSubject.value && this.userBehaviorSubject.value.isLegendPanel){
      return true;
    }else{
      return false;
    }
  }

  isDistrictAdminPanel(){
    if (this.userBehaviorSubject.value && this.userBehaviorSubject.value.isDistrictAdminPanel){
      return true;
    }else{
      return false;
    }
  }

  isAssemblyConstituency(){
    if (this.userBehaviorSubject.value && this.userBehaviorSubject.value.isAssemblyConstituency){
      return true;
    }else{
      return false;
    }
  }

  isPollingStationVolunteer(){
    if (this.userBehaviorSubject.value && this.userBehaviorSubject.value.isPollingStationVolunteer){
      return true;
    }else{
      return false;
    }
  }

  isBoothVolunteer(){
    if (this.userBehaviorSubject.value && this.userBehaviorSubject.value.isBoothVolunteer){
      return true;
    }else{
      return false;
    }
  }

  isVolunteer(){
    if (this.userBehaviorSubject.value && this.userBehaviorSubject.value.isVolunteer){
      return true;
    }else{
      return false;
    }
  }

  isDeveloper(): boolean{
    if (this.userBehaviorSubject.value && this.userBehaviorSubject.value.isDeveloper){
      return true;
    }else{
      return false;
    }
  }




  // isRefinish(): boolean{
  //   if (this.userBehaviorSubject.value && this.userBehaviorSubject.value.isRefinish){
  //     return true;
  //   }else{
  //     return false;
  //   }
  // }
  //
  // isPettyCash(): boolean{
  //   if (this.userBehaviorSubject.value && this.userBehaviorSubject.value.isPettyCash){
  //     return true;
  //   }else{
  //     return false;
  //   }
  // }

  getUserName(): string{
    if (this.userBehaviorSubject.value){
      return this.userBehaviorSubject.value.userName;
    }
    return "";
  }


  autoLogin(){
    const userData: User = JSON.parse(<string>localStorage.getItem('user'));
    if (!userData){
      return;
    }
    const loadedUser = new User(userData.uniqueId, userData.userName, userData._authKey, userData.userTypeId,userData.userTypeName,userData.assemblyConstituencyId);
    if (loadedUser.authKey){
      this.userBehaviorSubject.next(loadedUser);
      // if (this.isOwner()){
      //   this.router.navigate(['/owner']).then(r => {});
      // }
      // if (this.isDeveloper()){
      //   this.router.navigate(['/developer']).then(r => {});
      // }
      // if (this.isLegislativeCandidate()){
      //   this.router.navigate(['/mp']).then(r => {});
      // }
      //
      // if (this.isLegendPanel()){
      //   this.router.navigate(['/legendVolunteer']).then(r => {});
      // }
      //
      // if (this.isDistrictAdminPanel()){
      //   this.router.navigate(['/districtAdminPanel']).then(r => {});
      // }
      //
      // if (this.isAssemblyConstituency()){
      //   this.router.navigate(['/assemblyConstituency']).then(r => {});
      // }
      //
      // if (this.isBoothVolunteer()){
      //   this.router.navigate(['/boothVolunteer']).then(r => {});
      // }
      //
      // if (this.isVolunteer()){
      //   this.router.navigate(['/volunteer']).then(r => {});
      // }
      //
      // if (this.isPollingStationVolunteer()){
      //   this.router.navigate(['/pollingVolunteer']).then(r => {});
      // }
      // this.userBehaviorSubject.next(loadedUser);
    }
  }


  login(loginData: any){
    return this.http.post<AuthResponseData>(this.BASE_API_URL + '/login', loginData)
        .pipe(catchError(this.errorService.serverError), tap(resData => {
          // tslint:disable-next-line:max-line-length
          if (resData.status === true){
            console.log(resData.data);
            const user = new User(resData.data.uniqueId,
                resData.data.userName,
                resData.data.token,
                resData.data.userTypeId,
                resData.data.userTypeName,resData.data.assemblyConstituencyId);
            this.userBehaviorSubject.next(user);
            localStorage.setItem('user', JSON.stringify(user));
          }
        }));  // this.handleError is a method created by me
  }


  private serverError(err: any) {
    if (err instanceof Response) {
      return throwError('backend server error ');
      // if you're using lite-server, use the following line
      // instead of the line above:
      // return Observable.throw(err.text() || 'backend server error');
    }
    if (err.status === 0){
      // tslint:disable-next-line:label-position
      return throwError ({status: err.status, message: 'Backend Server is not Working', statusText: err.statusText});
    }
    if (err.status === 401){
      // tslint:disable-next-line:label-position
      return throwError ({status: err.status, message: 'Your are not authorised', statusText: err.statusText});
    }
    return throwError(err);
  }
  private handleError(errorResponse: HttpErrorResponse){
    if (errorResponse.error.message.includes('1062')){
      return throwError('Record already exists');
    }else {
      return throwError(errorResponse.error.message);
    }
  }

  redirectToRoot(){
    this.router.navigate(['/']).then(r => {
      if (r) {
        location.reload();
      }
    });
  }

  logout(){
    this.http.get<any>(this.BASE_API_URL + '/logout').subscribe( response => {
      // this.userBehaviorSubject.next(null);
      localStorage.removeItem('user');
      this.router.navigate(['/']).then(r => {
        if (r) {
          location.reload();
        }
      });
      }, (error) => {
        console.log('logout with error', error);
        // this.userBehaviorSubject.next(null);
        localStorage.removeItem('user');
        this.router.navigate(['/']).then(r => {
          if (r) {
            location.reload();
          }
        });
    });

  }


    logoutAll() {
      // this.userBehaviorSubject.next(null);
      // localStorage.removeItem('user');
      this.http.get<any>(this.BASE_API_URL + '/revokeAll').subscribe( response => {
        // this.userBehaviorSubject.next(null);
        localStorage.removeItem('user');
        this.router.navigate(['/']).then(r => {
          if (r) {
            location.reload();
          }
        });
      }, (error) => {
        console.log('logout with error', error);
        // this.userBehaviorSubject.next(null);
        localStorage.removeItem('user');
        this.router.navigate(['/']).then(r => {
          if (r) {
            location.reload();
          }
        });
      });
    }

  upload(file: string | Blob | undefined): Observable<any> {

    // Create form data
    const formData = new FormData();

    // Store form name as "file" with file data
    // @ts-ignore
    formData.append('file', file);
    formData.append('filename', 'profile_pic_' + JSON.parse(<string>localStorage.getItem('user')).uniqueId + '.jpeg');
    // Make http post request over api
    // with formData as req
    // return this.http.post('http://127.0.0.1/gold_project/new_gold_api/public/api/uploadPicture', formData);
    return this.http.post(this.BASE_API_URL + '/uploadPicture', formData);
  }
}
