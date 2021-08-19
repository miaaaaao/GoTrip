import { Component, OnInit } from '@angular/core';
import * as Parse from 'parse';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css']
})
export class SignUpPageComponent implements OnInit {
  email: string = ''
  password: string = ''
  username: string = ''

  constructor() { }

  ngOnInit(): void {
  }
  onKey(event: any) { // without type info
  //  this.email = event.target.value
  }
  async onClickMe() {
    const user = new Parse.User();
    user.set("username", this.username);
    user.set("password", this.password);
    user.set("email", this.email);

    console.log('test');


       try {
          await user.signUp();
          // Hooray! Let them use the app now.
        } catch (error) {
          // Show the error message somewhere and let the user try again.
          alert("Error: " + error.code + " " + error.message);
        }


  }






}
