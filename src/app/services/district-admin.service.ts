import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ErrorService } from './error.service';
import { catchError, Subject, tap } from 'rxjs';
import { PollingMember } from '../models/PollingMember';


@Injectable({
  providedIn: 'root'
})
export class DistrictAdminService {

  private BASE_API_URL = environment.BASE_API_URL;

  pollingMembers: PollingMember[] = [];
  pollingMemberSubject = new Subject<any[]>();

  boothMemberSubject = new Subject<any[]>();
  boothMembers: any[] = [];

  volunteers: any[] = [];
  volunteerSubject = new Subject<any[]>();

  voterMembers: any[] = [];
  voterMembersSubject = new Subject<any[]>();

  constructor(private http: HttpClient, private errorService: ErrorService) { }

  getPolingAgentByAssembly(assemblyId: number) {
    // return  this.http.get(this.BASE_API_URL + '/volunteer/' + pollingAgentId).subscribe((response: ServerResponse) => {
    //   console.log(response);
    // });

    return this.http.get<{ status: string, message: string, data: PollingMember[] }>(this.BASE_API_URL + '/pollingVolunteer/' + assemblyId)
      .pipe(catchError(this.errorService.serverError),
        tap((response: { status: string, message: string, data: any }) => {
          this.pollingMembers.unshift(response.data);
          this.pollingMemberSubject.next([...this.pollingMembers]);
        }));
  }


  getPolingAgentByAssemblyListener() {
    return this.pollingMemberSubject.asObservable();
  }


  getBoothByPolingAgent(pollingAgentId: number) {
    // return  this.http.get(this.BASE_API_URL + '/volunteer/' + pollingAgentId).subscribe((response: ServerResponse) => {
    //   console.log(response);
    // });

    return this.http.get<{ status: string, message: string, data: any[] }>(this.BASE_API_URL + '/boothVolunteer/' + pollingAgentId)
      .pipe(catchError(this.errorService.serverError),
        tap((response: { status: string, message: string, data: any[] }) => {
          this.boothMembers.unshift(response.data);
          this.boothMemberSubject.next([...this.boothMembers]);
        }));
  }




  getVolunteerByBoothMember(pollingAgentId: number) {
    // return  this.http.get(this.BASE_API_URL + '/volunteer/' + pollingAgentId).subscribe((response: ServerResponse) => {
    //   console.log(response);
    // });

    return this.http.get<{ status: string, message: string, data: any[] }>(this.BASE_API_URL + '/volunteer/' + pollingAgentId)
      .pipe(catchError(this.errorService.serverError),
        tap((response: { status: string, message: string, data: any[] }) => {
          // console.log(response);
          this.volunteers.unshift(response.data);
          this.volunteerSubject.next([...this.volunteers]);
        }));
  }


  getAllvotersByUserId(userId: number): any {

    return this.http.get<{ status: string, message: string, data: any[] }>(this.BASE_API_URL + '/volunteer/' + userId + '/members')
      .pipe(catchError(this.errorService.serverError),
        tap((response: { status: string, message: string, data: any[] }) => {
          this.voterMembers = response.data;
          this.voterMembersSubject.next([...this.voterMembers]);
        }));

  }
  getAllVoterListener() {
    return this.voterMembersSubject.asObservable();
  }
}
