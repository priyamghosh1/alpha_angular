import { Component, OnInit } from '@angular/core';
import { faAddressBook } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidenav-mp',
  templateUrl: './sidenav-mp.component.html',
  styleUrls: ['./sidenav-mp.component.scss']
})
export class SidenavMpComponent implements OnInit {
  faAddressBook = faAddressBook;
  displayMaster=false;

  constructor() { }

  ngOnInit(): void {
  }
  toggleMaster(){
    this.displayMaster=!this.displayMaster;
  }

}
