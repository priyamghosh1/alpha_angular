import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ErrorService } from './error.service';
import {catchError, tap} from 'rxjs/operators';
import { Subject } from 'rxjs-compat';


@Injectable({
  providedIn: 'root'
})
export class OwnerService {
  private BASE_API_URL = environment.BASE_API_URL;
  legislativeMembers: any[]=[];
  legislativeMemberSubject = new Subject<any[]>();

  constructor(private http: HttpClient, private errorService: ErrorService) { }

  saveNewLegislativeByAdmin(userData: any){
    return this.http.post<{status:boolean, message:string ,data:any}>(this.BASE_API_URL + '/legislativeCandidate', userData)
      .pipe(catchError(this.errorService.serverError), tap(response => {
        this.legislativeMembers.unshift(response.data);
        this.legislativeMemberSubject.next([...this.legislativeMembers]);
      }));
  }
}
