import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {Assembly} from "../models/assembly.model";
import {HttpClient} from "@angular/common/http";
import {ServerResponse} from "../models/ServerResponse.model";
import {Subject} from 'rxjs';
import {ErrorService} from './error.service';
import {catchError, tap} from 'rxjs/operators';
import {PollingMember} from "../models/PollingMember";

@Injectable({
  providedIn: 'root'
})
export class AssemblyService {
  private BASE_API_URL = environment.BASE_API_URL;

  pollingMemberSubject = new Subject<any[]>();
  pollingMembers: PollingMember[] = [];
  constructor(private http: HttpClient, private errorService: ErrorService) {

  }

  getAssemblyWithDistrict():any{
    return this.http.get(this.BASE_API_URL + '/dev/assembly/allData');
  }
}
