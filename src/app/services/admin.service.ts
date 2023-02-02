import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private BASE_API_URL = environment.BASE_API_URL;

  constructor(private http: HttpClient, private errorService: ErrorService) { }

  
}
