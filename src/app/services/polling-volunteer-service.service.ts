import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class PollingVolunteerServiceService {

  private BASE_API_URL = environment.BASE_API_URL;

  voters: any[]=[];
  votersSubject = new Subject<any[]>();

  constructor(private http: HttpClient, private errorService: ErrorService) { }

  getVotersByPollingVolunteerId(pollingAgentId: number) {


    return this.http.get<{ status: string, message: string, data: any[] }>(this.BASE_API_URL + '/pollingVolunteer/' + pollingAgentId + '/members')
      .pipe(catchError(this.errorService.serverError),
        tap((response: { status: string, message: string, data: any[] }) => {
          // console.log(response.data);
          this.voters.unshift(response.data);
          this.votersSubject.next([...this.voters]);
        }));
  }

  getVotersByPollingVolunteerIdListener(){
    return this.votersSubject.asObservable();
  }
}
