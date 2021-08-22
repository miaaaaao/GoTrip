import { Component, OnInit } from '@angular/core';
import * as Parse from 'parse';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  email: string = ''
  password: string = ''


  constructor() { }

  ngOnInit(): void {
  }

  async onClickMe(){
    const user = await Parse.User.logIn(this.email, this.password);
  }
}
