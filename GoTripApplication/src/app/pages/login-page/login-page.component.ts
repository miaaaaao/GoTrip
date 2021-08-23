import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Parse from 'parse';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  email: string = ''
  password: string = ''


  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onKey(event: any) {

    switch (event.target.id) {
      case "InputEmail":
        this.email = event.target.value;
        break;
      case "InputPassword":
        this.password = event.target.value;
        break;
    }
    console.log(event);

}

  async onClickMe(){
    const user = await Parse.User.logIn(this.email, this.password)
    .then(() => {
  this.router.navigate(['dashboard']);
}).catch((error: any) => {
  // Show the error message somewhere
  alert("Error: " + error.code + " " + error.message);
});
  }
}
