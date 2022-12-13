import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ErrorService} from './error.service';
import {ServerResponse} from '../models/ServerResponse.model';
import {environment} from '../../environments/environment';
import { Area } from '../models/area.model';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
// @ts-ignore
export class AreaService {

  private BASE_API_URL = environment.BASE_API_URL;
  areas : Area[] = [];
  areaSubject = new Subject<Area[]>();

  constructor(private  http: HttpClient, private errorService: ErrorService) {
    this.http.get(this.BASE_API_URL   + '/getAllArea' ).subscribe((response: ServerResponse) => {
      this.areas = response.data;
      this.areaSubject.next([...this.areas]);
    });
  }

  getArea(){
    return [...this.areas];
  }

  getGameTypeListener(){
    return this.areaSubject.asObservable();
  }
}
