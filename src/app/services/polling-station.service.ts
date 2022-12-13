import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PollingStationService {
  private BASE_API_URL = environment.BASE_API_URL;

  constructor(private http: HttpClient) { }

  getPollingStationByAssemblyId(assemblyId:number):any{
    return this.http.get(this.BASE_API_URL + '/pollingStations/'+assemblyId);
  }
}
