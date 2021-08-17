import { Component, OnInit, Input } from '@angular/core';
import { currentUser } from '../services/getCurrentUserData.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input()
  user: string;
  visibility: string;

  constructor( private currentUser: currentUser)  {
    this.user = '';
    this.visibility = "invisible";
  }

  ngOnInit(): void {
    this.user = this.currentUser.userId //Get info about the logged user and add to user variable

  }
  /*
  * Write here the logout function
  */
  logOut(){

  }

}
