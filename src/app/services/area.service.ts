import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ErrorService} from './error.service';
import {ServerResponse} from '../models/ServerResponse.model';
import {environment} from '../../environments/environment';
import { Area } from '../models/area.model';
import { catchError, Subject, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
// @ts-ignore
export class AreaService {

  private BASE_API_URL = environment.BASE_API_URL;
  areas : Area[] = [];
  states : any[] = [];
  areaSubject = new Subject<Area[]>();
  stateSubject = new Subject<any>();

  assembly: any;
  assemblySubject= new Subject<any>();

  constructor(private  http: HttpClient, private errorService: ErrorService) {
    this.http.get(this.BASE_API_URL   + '/getAllArea' ).subscribe((response: ServerResponse) => {
      this.areas = response.data;
      this.areaSubject.next([...this.areas]);
    });


    this.http.get(this.BASE_API_URL   + '/dev/states' ).subscribe((response: ServerResponse) => {
      this.states = response.data;
      // console.log(this.states);
      this.stateSubject.next([...this.states]);
    });

    
  }

  getAssemblyByDistrictId(districtId:number):any{
    return this.http.get<{status:string,message:string,data:any[]}>(this.BASE_API_URL   + '/assembly/district/' + districtId )
    .pipe(catchError(this.errorService.serverError),
    tap((response : {status:string,message:string,data:any[]}) => {
      this.assembly = response.data;
      this.assemblySubject.next([...this.assembly]);
    }));
  }

  // getAssemblyByDistrictId(districtId:number):any{
  //   return this.http.get<{status:string,message:string,data:any[]}>(this.BASE_API_URL   + '/assembly/district/' + districtId ).subscribe((response: ServerResponse) => {
  //     this.assembly = response.data;
  //     this.assemblySubject.next([...this.assembly]);
  //   });
  // }

  getAssemblyByDistrictIdListener(){
    return this.assemblySubject.asObservable();
  }

  getArea(){
    return [...this.areas];
  }

  getstate(){
    return [...this.states];
  }

  getGameTypeListener(){
    return this.areaSubject.asObservable();
  }

  getStateListener(){
    return this.stateSubject.asObservable();
  }
}
