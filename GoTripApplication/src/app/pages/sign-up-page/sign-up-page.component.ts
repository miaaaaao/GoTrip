import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private router: Router) { }

  ngOnInit(): void {
  }


    onKey(event: any) {

      switch (event.target.id) {
        case "InputName":
          this.username = event.target.value;
          break;
        case "InputEmail":
          this.email = event.target.value;
          break;
        case "InputPassword":
          this.password = event.target.value;
          break;
      }
      console.log(event);

  }
 async onClickMe() {
    const user = new Parse.User();
    user.set("username", this.username);
    user.set("password", this.password);
    user.set("email", this.email);

    console.log(this);

    console.log("New User signed up");

       try {
          await user.signUp();
          this.router.navigate(['dashboard']);
        } catch (error) {
          // Show the error message somewhere and let the user try again.
          alert("Error: " + error.code + " " + error.message);
        }

  }
}
