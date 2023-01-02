import { Component, OnInit } from '@angular/core';
import { faAddressBook } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-sidenav-volunteer',
  templateUrl: './sidenav-volunteer.component.html',
  styleUrls: ['./sidenav-volunteer.component.scss']
})
export class SidenavVolunteerComponent implements OnInit {
  faAddressBook = faAddressBook;
  displayMaster=false;

  constructor() { }

  ngOnInit(): void {
  }
  toggleMaster(){
    this.displayMaster=!this.displayMaster;
  }

}
