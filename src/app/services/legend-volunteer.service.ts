import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
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


}
