import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Data} from "@angular/router";
import {Student} from "../../models/student.model";
import {StudentService} from "../../services/student.service";
import {ConfirmationService, MenuItem, MessageService, PrimeNGConfig} from "primeng/api";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Table} from "primeng/table";


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
  providers: [ConfirmationService, MessageService]

})
export class StudentComponent implements OnInit{
  loginType: any;
  students: Student[] = [];

  msgs: { severity: string; summary: string; detail: string }[] = [];
  value3: any;
  data: any;
  displayDialog: boolean = false;


  items: MenuItem[]=[];
  activeIndex: number = 0;


  studentNameFormGroup: FormGroup;
  studentGuardianFormGroup: FormGroup;
  secondStudentFormGroup: FormGroup;
  thirdStudentFormGroup: FormGroup;
  fourthStudentFormGroup: FormGroup;
  isLinear: boolean = false;

  constructor(private _formBuilder: FormBuilder, private messageService: MessageService, private activatedRoute: ActivatedRoute, private studentService: StudentService, private confirmationService: ConfirmationService,private primengConfig: PrimeNGConfig) {
    const data: Data = this.activatedRoute.snapshot.data;
    this.loginType = data['loginType'];
    this.studentNameFormGroup = this._formBuilder.group({
      studentId : new FormControl(null),
      studentName : new FormControl(null, [Validators.required, Validators.maxLength(100), Validators.minLength(4)]),
      billingName : new FormControl(null, [Validators.required, Validators.maxLength(100), Validators.minLength(4)]),
      fatherName : new FormControl(null),
      motherName : new FormControl(null),
      guardianName : new FormControl(null),
      relationToGuardian : new FormControl(null)
    });
    this.studentGuardianFormGroup = this._formBuilder.group({
      fatherName : new FormControl(null),
      motherName : new FormControl(null),
      guardianName : new FormControl(null),
      relationToGuardian : new FormControl(null)
    });

    this.secondStudentFormGroup = this._formBuilder.group({
      dob : new FormControl(null),
      sex : new FormControl(null),
    });
    this.thirdStudentFormGroup = this._formBuilder.group({
      address : new FormControl(null,[Validators.required, Validators.maxLength(100), Validators.minLength(4)]),
      city : new FormControl(null,[Validators.required, Validators.maxLength(20), Validators.minLength(4)]),
      district : new FormControl(null,[Validators.required, Validators.maxLength(20), Validators.minLength(4)]),
      stateId : new FormControl(null),
      pin : new FormControl(null)
    });

    this.fourthStudentFormGroup = this._formBuilder.group({
      guardianContactNumber : new FormControl(null),
      whatsappNumber : new FormControl(null),
      email : new FormControl(null),
      qualification : new FormControl(null)
    });

  }

  showDialog() {
    this.displayDialog = true;
  }

  confirm() {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.msgs = [{severity:'info', summary:'Confirmed', detail:'Record deleted'}];
      },
      reject: () => {
        this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
      }
    });
    }


  ngOnInit(): void {
    this.students = this.studentService.getStudents();
    this.studentService.getStudentUpdateListener().subscribe((response: Student[]) =>{
      this.students = response;
    });
    this.primengConfig.ripple = true;


    this.items = [{
      label: 'Personal',
      command: (event: any) => {
        this.activeIndex = 0;
        this.messageService.add({severity:'info', summary:'First Step', detail: event.item.label});
      }
    },
      {
        label: 'Seat',
        command: (event: any) => {
          this.activeIndex = 1;
          this.messageService.add({severity:'info', summary:'Seat Selection', detail: event.item.label});
        }
      },
      {
        label: 'Payment',
        command: (event: any) => {
          this.activeIndex = 2;
          this.messageService.add({severity:'info', summary:'Pay with CC', detail: event.item.label});
        }
      },
      {
        label: 'Confirmation',
        command: (event: any) => {
          this.activeIndex = 3;
          this.messageService.add({severity:'info', summary:'Last Step', detail: event.item.label});
        }
      }
    ];
  }



  getEventValue($event:any) :string {
    return $event.target.value;
  }

}
