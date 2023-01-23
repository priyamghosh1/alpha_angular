import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class LegislativeService {
  private BASE_API_URL = environment.BASE_API_URL;

  voters: any[] = [];
  votersSubject = new Subject<any[]>();
  legendVolunteersSubject = new Subject<any[]>();
  legendVolunteers: any[] = [];

  constructor(private http: HttpClient, private errorService: ErrorService) {



  }

  saveNewLegendByLegislative(userData: any) {
    return this.http.post<{ status: boolean, message: string, data: any }>(this.BASE_API_URL + '/legendVolunteer', userData)
      .pipe(catchError(this.errorService.serverError), tap(response => {
        console.log(response.data);
        this.legendVolunteers = response.data;
      }));
  }

  updateLegendByLegislative(userData: any){
    return this.http.put<{status:boolean, message:string ,data:any}>(this.BASE_API_URL + '/legendVolunteer', userData)
    .pipe(catchError(this.errorService.serverError), tap(response => {
      const x = this.legendVolunteers.findIndex(x=> x.personId === response.data.id);
      this.legendVolunteers[x] = response.data;
      this.legendVolunteersSubject.next([...this.legendVolunteers]);
    }));
  }

  getLegendByLegislative(legislativeId: number){
    return this.http.get<{status:string,message:string,data:any[]}>(this.BASE_API_URL + '/legendVolunteer/'+ legislativeId)
      .pipe(catchError(this.errorService.serverError),
        tap((response : {status:string,message:string,data:any[]}) => {
          this.legendVolunteers = response.data;
          this.legendVolunteersSubject.next([...this.legendVolunteers]);
        }));
  }

  getLegendByLegislativeListener(){
    return this.legendVolunteersSubject.asObservable();
  }

  getvotersByLegislative(legislativeId: number){

    return this.http.get<{ status: string, message: string, data: any[] }>(this.BASE_API_URL + '/legendVolunteer/' + legislativeId + '/members')
      .pipe(catchError(this.errorService.serverError),
        tap((response: { status: string, message: string, data: any[] }) => {
          // console.log(response.data);
          this.voters.unshift(response.data);
          this.votersSubject.next([...this.voters]);
        }));

  }

  getvotersByLegislativeListener(){
    return this.votersSubject.asObservable();
  }
}
