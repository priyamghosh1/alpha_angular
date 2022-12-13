import { Component, OnInit } from '@angular/core';
import {AssemblyService} from "../services/assembly.service";
import {Assembly} from "../models/assembly.model";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Router} from "@angular/router";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  allStates: any[]=[];

  selectedCity1: any;


  assembliesForDistrict1: Assembly[] = [];

  constructor(private assemblyService: AssemblyService,private modalService: NgbModal,private router: Router) { }

  ngOnInit(): void {
    this.assemblyService.getAssemblyWithDistrict().subscribe((response: {status: boolean,
      message:string,data: any}) => {
          this.allStates = response.data;
    });
    // this.allStates = [
    //   {
    //     "id": 17,
    //     "name": "Meghalaya",
    //     "state_code": 17,
    //     "districts": [
    //       {
    //         "districtId": 1,
    //         "name": "WEST JAINTIA HILLS",
    //         "assemblies": [
    //           {
    //             "assemblyId": 1,
    //             "assemblyName": "Nartiang(ST)"
    //           },
    //           {
    //             "assemblyId": 2,
    //             "assemblyName": "Jowai(ST)"
    //           },
    //           {
    //             "assemblyId": 3,
    //             "assemblyName": "Raliang(ST)"
    //           },
    //           {
    //             "assemblyId": 4,
    //             "assemblyName": "Mowkaiaw(ST)"
    //           },
    //           {
    //             "assemblyId": 7,
    //             "assemblyName": "Amlarem(ST)"
    //           }
    //         ]
    //       },
    //       {
    //         "districtId": 2,
    //         "name": "EAST JAINTIA HILLS",
    //         "assemblies": [
    //           {
    //             "assemblyId": 5,
    //             "assemblyName": "Sutnga Saipung(ST)"
    //           },
    //           {
    //             "assemblyId": 6,
    //             "assemblyName": "Khliehriat(ST)"
    //           }
    //         ]
    //       },
    //       {
    //         "districtId": 3,
    //         "name": "RIBHOI",
    //         "assemblies": [
    //           {
    //             "assemblyId": 8,
    //             "assemblyName": "Mawhati(ST)"
    //           },
    //           {
    //             "assemblyId": 9,
    //             "assemblyName": "Nongpoh(ST)"
    //           },
    //           {
    //             "assemblyId": 10,
    //             "assemblyName": "Jirang(ST)"
    //           },
    //           {
    //             "assemblyId": 11,
    //             "assemblyName": "Umsning(ST)"
    //           },
    //           {
    //             "assemblyId": 12,
    //             "assemblyName": "Umroi(ST)"
    //           }
    //         ]
    //       },
    //       {
    //         "districtId": 4,
    //         "name": "EAST KHASI HILLS",
    //         "assemblies": [
    //           {
    //             "assemblyId": 13,
    //             "assemblyName": "Mawryngkneng(ST)"
    //           },
    //           {
    //             "assemblyId": 14,
    //             "assemblyName": "Pynthorumkhrah(GEN)"
    //           },
    //           {
    //             "assemblyId": 15,
    //             "assemblyName": "Mawlai(ST)"
    //           },
    //           {
    //             "assemblyId": 16,
    //             "assemblyName": "East Shillong(ST)"
    //           },
    //           {
    //             "assemblyId": 17,
    //             "assemblyName": "North Shillong(ST)"
    //           },
    //           {
    //             "assemblyId": 18,
    //             "assemblyName": "West Shillong(GEN)"
    //           },
    //           {
    //             "assemblyId": 19,
    //             "assemblyName": "South Shillong(GEN)"
    //           },
    //           {
    //             "assemblyId": 20,
    //             "assemblyName": "Mylliem(ST)"
    //           },
    //           {
    //             "assemblyId": 21,
    //             "assemblyName": "Nongthymmai(ST)"
    //           },
    //           {
    //             "assemblyId": 22,
    //             "assemblyName": "Nongkrem(ST)"
    //           },
    //           {
    //             "assemblyId": 23,
    //             "assemblyName": "Sohiong(ST)"
    //           },
    //           {
    //             "assemblyId": 24,
    //             "assemblyName": "Mawphlang(ST)"
    //           },
    //           {
    //             "assemblyId": 25,
    //             "assemblyName": "Mawsynram(ST)"
    //           },
    //           {
    //             "assemblyId": 26,
    //             "assemblyName": "Shella(ST)"
    //           },
    //           {
    //             "assemblyId": 27,
    //             "assemblyName": "Pynursla(ST)"
    //           },
    //           {
    //             "assemblyId": 28,
    //             "assemblyName": "Sohra(ST)"
    //           },
    //           {
    //             "assemblyId": 29,
    //             "assemblyName": "Mawkynrew(ST)"
    //           }
    //         ]
    //       },
    //       {
    //         "districtId": 5,
    //         "name": "WEST KHASI HILLS",
    //         "assemblies": [
    //           {
    //             "assemblyId": 30,
    //             "assemblyName": "Mairang(ST)"
    //           },
    //           {
    //             "assemblyId": 31,
    //             "assemblyName": "Mawthadraishan(ST)"
    //           },
    //           {
    //             "assemblyId": 32,
    //             "assemblyName": "Nongstoin(ST)"
    //           },
    //           {
    //             "assemblyId": 33,
    //             "assemblyName": "Rambrai Jyrngam(ST)"
    //           },
    //           {
    //             "assemblyId": 34,
    //             "assemblyName": "Mawshynrut(ST)"
    //           }
    //         ]
    //       },
    //       {
    //         "districtId": 6,
    //         "name": "SOUTH WEST KHASI HILLS",
    //         "assemblies": [
    //           {
    //             "assemblyId": 35,
    //             "assemblyName": "Ranikot(ST)"
    //           },
    //           {
    //             "assemblyId": 36,
    //             "assemblyName": "Mawkyrwat(ST)"
    //           }
    //         ]
    //       },
    //       {
    //         "districtId": 7,
    //         "name": "NORTH GARO HILLS",
    //         "assemblies": [
    //           {
    //             "assemblyId": 38,
    //             "assemblyName": "Mendipathar(ST)"
    //           },
    //           {
    //             "assemblyId": 39,
    //             "assemblyName": "Resubelpara(ST)"
    //           },
    //           {
    //             "assemblyId": 40,
    //             "assemblyName": "Bajengdoba(ST)"
    //           }
    //         ]
    //       },
    //       {
    //         "districtId": 8,
    //         "name": "EAST GARO HILLS",
    //         "assemblies": [
    //           {
    //             "assemblyId": 37,
    //             "assemblyName": "Kharkutta(ST)"
    //           },
    //           {
    //             "assemblyId": 41,
    //             "assemblyName": "Songsak(ST)"
    //           },
    //           {
    //             "assemblyId": 42,
    //             "assemblyName": "Rongjeng(ST)"
    //           },
    //           {
    //             "assemblyId": 43,
    //             "assemblyName": "William Nagar(ST)"
    //           }
    //         ]
    //       },
    //       {
    //         "districtId": 9,
    //         "name": "WEST GARO HILLS",
    //         "assemblies": [
    //           {
    //             "assemblyId": 44,
    //             "assemblyName": "Raksamgre(ST)"
    //           },
    //           {
    //             "assemblyId": 45,
    //             "assemblyName": "Tikrikilla(ST)"
    //           },
    //           {
    //             "assemblyId": 46,
    //             "assemblyName": "Phulbari(GEN)"
    //           },
    //           {
    //             "assemblyId": 47,
    //             "assemblyName": "Rajabala(GEN)"
    //           },
    //           {
    //             "assemblyId": 48,
    //             "assemblyName": "Selsella(ST)"
    //           },
    //           {
    //             "assemblyId": 49,
    //             "assemblyName": "Dadenggre(ST)"
    //           },
    //           {
    //             "assemblyId": 50,
    //             "assemblyName": "North Tura(ST)"
    //           },
    //           {
    //             "assemblyId": 51,
    //             "assemblyName": "South Tura(ST)"
    //           },
    //           {
    //             "assemblyId": 52,
    //             "assemblyName": "Rangsakona(ST)"
    //           },
    //           {
    //             "assemblyId": 56,
    //             "assemblyName": "Gambegre(ST)"
    //           },
    //           {
    //             "assemblyId": 57,
    //             "assemblyName": "Dalu(ST)"
    //           }
    //         ]
    //       },
    //       {
    //         "districtId": 10,
    //         "name": "SOUTH WEST GARO HILLS",
    //         "assemblies": [
    //           {
    //             "assemblyId": 53,
    //             "assemblyName": "Ampati(ST)"
    //           },
    //           {
    //             "assemblyId": 54,
    //             "assemblyName": "Mahendraganj(ST)"
    //           },
    //           {
    //             "assemblyId": 55,
    //             "assemblyName": "Salmanpara(ST)"
    //           }
    //         ]
    //       },
    //       {
    //         "districtId": 11,
    //         "name": "SOUTH GARO HILLS",
    //         "assemblies": [
    //           {
    //             "assemblyId": 58,
    //             "assemblyName": "Rongara Siju(ST)"
    //           },
    //           {
    //             "assemblyId": 59,
    //             "assemblyName": "Chokpot(ST)"
    //           },
    //           {
    //             "assemblyId": 60,
    //             "assemblyName": "Baghmara(ST)"
    //           }
    //         ]
    //       }
    //     ]
    //   }
    // ];

  }
  openSm(content:any) {
    this.modalService.open(content, { size: 'sm' });
  }

  onAssemblySelect(value: any) {
    this.router.navigateByUrl('/login', { state: { assembly: value } });
  }
}
