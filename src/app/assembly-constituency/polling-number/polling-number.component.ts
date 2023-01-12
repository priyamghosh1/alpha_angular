import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { AreaService } from 'src/app/services/area.service';
import { AuthService } from 'src/app/services/auth.service';
import { PollingStationService } from 'src/app/services/polling-station.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-polling-number',
  templateUrl: './polling-number.component.html',
  styleUrls: ['./polling-number.component.scss']
})
export class PollingNumberComponent implements OnInit {

  pollingForm = new UntypedFormGroup({
    pollingStationId: new UntypedFormControl(null, [Validators.required]),
    pollingStationName: new UntypedFormControl(null, [Validators.required]),
  });

  loggedInUser: User | undefined;
  pollingStations: any;
  
  isLinear = false;
  pollingData:any;




  constructor(private authService: AuthService,
    private pollingStationService: PollingStationService,) { }

  ngOnInit(): void {
    this.loggedInUser = this.authService.userBehaviorSubject.value;
    this.pollingStationService.getPollingStationByAssemblyId(this.loggedInUser?.assemblyConstituencyId).subscribe((response: {
      status: boolean,
      message: string, data: any
    }) => {
      this.pollingStations = response.data;
    });
  }

  onSubmit(){
    console.log(this.pollingForm.value);
    Swal.fire({
      title: 'Confirmation',
      text: 'Do you sure to create user?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, create It!'
    }).then((result) => {
      if (result.isConfirmed){
        const pollingFormData = this.pollingForm.value;
        const formData = new FormData();

        const data = {
          pollingStationId : this.pollingForm.value.pollingStationId,
          pollingStationName : this.pollingForm.value.pollingStationName,
        }
        console.log('data', data);

        // formData.append("pollingStationId", pollingFormData.pollingStationId);
        // formData.append("pollingStationName", pollingFormData.pollingStationName);

        this.pollingStationService.saveNewPollingName(data).subscribe(response=>{
          if (response) {
            // const responseData = response.data;
            this.pollingData = response.data;
            this.pollingForm.reset();
            // @ts-ignore
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'polling name added',
              showConfirmButton: false,
              timer: 1000
            });

          }
        })
      }
    });
  }

}
