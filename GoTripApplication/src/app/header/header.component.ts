import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { currentUser } from '../services/getCurrentUserData.service';
import * as Parse from 'parse';
import {File} from "@angular/compiler-cli/src/ngtsc/file_system/testing/src/mock_file_system";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private updateHead:any;

  @Input()
  user: string;
  photoUrl: string;
  constructor(private currentUser: currentUser)  {
    this.user = '';
    this.photoUrl = '';
    //Subject to update the navigation when the user login
    this.updateHead = this.currentUser.updateUICurrentUser.subscribe(()=>{
      this.getUserDate();
    })
  }

  ngOnInit(): void {
    this.getUserDate()
  }

  getUserDate(){
    const currentUser = Parse.User.current();
    if (currentUser) {
      this.user = currentUser.id;
      const photo = currentUser.get('photo');
      this.photoUrl = photo.url();
    }
  }
  /*
  * Write here the logout function
  */
  logOut(){
    Parse.User.logOut().then(() => {
      const currentUser = Parse.User.current();  // this will now be null
    });
  }
  ngOnDestroy(){
    this.updateHead.unsubscribe();
  }

}
