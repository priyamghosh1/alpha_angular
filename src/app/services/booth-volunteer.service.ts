import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ErrorService } from './error.service';

import { catchError, Subject, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BoothVolunteerService {

  private BASE_API_URL = environment.BASE_API_URL;
  voterMembers: any[] = [];
  voterMembersSubject = new Subject<any[]>();

  constructor(private http: HttpClient, private errorService: ErrorService) { }

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
