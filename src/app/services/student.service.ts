import { Injectable } from '@angular/core';
import {Student} from "../models/student.model";
import {CommonService} from "./common.service";
import {ErrorService} from "./error.service";
import {catchError, tap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs";

class CommerService {
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  studentList: Student[] =[];
  studentSubject = new Subject<Student[]>();
  constructor(private commonService: CommonService, private errorService: ErrorService, private http: HttpClient) { }
  fetchAllStudents(){
    return this.http.get<any>(this.commonService.getAPI() + '/students')
      .pipe(catchError(this.errorService.serverError), tap(((response: {success: number, data: Student[]}) => {
        this.studentList=response.data;
        this.studentSubject.next([...this.studentList]);
      })));
  }

  getStudents(){
    return [...this.studentList];
  }
  getStudentUpdateListener(){
    return this.studentSubject.asObservable();
  }
}
