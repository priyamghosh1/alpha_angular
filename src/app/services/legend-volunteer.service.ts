import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PollingMember } from '../models/PollingMember';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class LegendVolunteerService {

  private BASE_API_URL = environment.BASE_API_URL;

  voters: any[]=[];
  votersSubject = new Subject<any[]>();

  districtVolunteers: any[]=[];
  districtVolunteersSubject= new Subject<any[]>();

  assemblyVolunteer: any[] = [];
  assemblyVolunteerSubject = new Subject<any[]>();

  pollingMembers: PollingMember[] = [];
  pollingMemberSubject = new Subject<any[]>();

  boothMemberSubject = new Subject<any[]>();
  boothMembers: any[] = [];

  volunteers: any[] = [];
  volunteerSubject = new Subject<any[]>();

  voterMembers: any[] = [];
  voterMembersSubject = new Subject<any[]>();

  constructor(private http: HttpClient, private errorService: ErrorService) { }

  saveNewDistrictAdminByLegend(userData: any){
    return this.http.post<{status:boolean, message:string ,data:any}>(this.BASE_API_URL + '/districtAdmin', userData)
      .pipe(catchError(this.errorService.serverError), tap(response => {
        console.log(response.data);
        this.districtVolunteers= response.data;
      }));
  }

  updateDistrictAdminByLegend(userData: any){
    return this.http.put<{status:boolean, message:string ,data:any}>(this.BASE_API_URL + '/districtAdmin', userData)
    .pipe(catchError(this.errorService.serverError), tap(response => {
      const x = this.districtVolunteers.findIndex(x=> x.personId === response.data.id);
      this.districtVolunteers[x] = response.data;
      this.districtVolunteersSubject.next([...this.districtVolunteers]);
    }));
  }

  getDistrictAdminByLegend(legendVolunteerId: number){
    return this.http.get<{status:string,message:string,data:any[]}>(this.BASE_API_URL + '/districtAdmin/'+ legendVolunteerId)
      .pipe(catchError(this.errorService.serverError),
        tap((response : {status:string,message:string,data:any[]}) => {
          this.districtVolunteers = response.data;
          this.districtVolunteersSubject.next([...this.districtVolunteers]);
        }));
  }

  getDistrictAdminByLegendListener(){
    return this.districtVolunteersSubject.asObservable();
  }

  getvotersByLegend(legendId: number){

    return this.http.get<{ status: string, message: string, data: any[] }>(this.BASE_API_URL + '/districtAdmin/' + legendId + '/members')
      .pipe(catchError(this.errorService.serverError),
        tap((response: { status: string, message: string, data: any[] }) => {
          // console.log(response.data);
          this.voters.unshift(response.data);
          this.votersSubject.next([...this.voters]);
        }));

  }

  getvotersByLegendListener(){
    return this.votersSubject.asObservable();
  }



  getAssemblyVolunteerByDistrictAdmin(districtAdminId: number) {
    return this.http.get<{ status: string, message: string, data: any[] }>(this.BASE_API_URL + '/assemblyVolunteer/' + districtAdminId)
      .pipe(catchError(this.errorService.serverError),
        tap((response: { status: string, message: string, data: any[] }) => {
          this.assemblyVolunteer = response.data;
          this.assemblyVolunteerSubject.next([...this.assemblyVolunteer]);
          // console.log(this.assemblyVolunteer);
        }));
  }
  getAssemblyVolunteerByDistrictAdminListener() {
    return this.assemblyVolunteerSubject.asObservable();
  }


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


  getAllvotersByUserId(userId:number):any{

    return this.http.get<{status:string,message:string,data:any[]}>(this.BASE_API_URL + '/volunteer/'+ userId + '/members')
      .pipe(catchError(this.errorService.serverError),
        tap((response : {status:string,message:string,data:any[]}) => {
          this.voterMembers = response.data;
          this.voterMembersSubject.next([...this.voterMembers]);
        }));

  }
  getAllVoterListener(){
    return this.voterMembersSubject.asObservable();
  }


}
