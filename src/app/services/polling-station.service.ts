import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import { catchError, Subject, tap } from 'rxjs';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class PollingStationService {
  private BASE_API_URL = environment.BASE_API_URL;
  pollingName : any[]=[];
  pollingNameSubject = new Subject<any[]>(); 

  constructor(private http: HttpClient,  private errorService: ErrorService) { }

  getPollingStationByAssemblyId(assemblyId:number):any{
    console.log(assemblyId);
    return this.http.get(this.BASE_API_URL + '/pollingStations/'+assemblyId);
  }

  saveNewPollingName(userData: any){
    return this.http.post<{data:any}>(this.BASE_API_URL + '/pollingStations', userData)
      .pipe(catchError(this.errorService.serverError), tap(response => {
        // console.log("polling service : ", response.data)
        this.pollingName.unshift(response.data);
        this.pollingNameSubject.next([...this.pollingName]);
      }));
  }
}
