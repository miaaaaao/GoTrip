import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import * as Parse from "parse";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm = this.formBuilder.group({
    name: '',
    email: '',
    newPass: ''
  });
  username: string | undefined;
  useremail: string | undefined;
  photoUrl: string;
  fileName: string;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.username = '';
    this.photoUrl = '';
    this.fileName = '';
  }

  ngOnInit(): void {
    const user = Parse.User.current();
    if (user) {
      this.username = user.getUsername();
      this.useremail = user.getEmail();
      const photo = user.get('photo');
      this.photoUrl = photo.url();
    }
  }

  onSubmit(): void {
    const user = Parse.User.current();
    if (this.profileForm.value.name != "") {
      user?.setUsername(this.profileForm.value.name);
    }
    if (this.profileForm.value.email != "") {
      user?.setEmail(this.profileForm.value.email);
    }
    if (this.profileForm.value.newPass != "") {
      user?.setPassword(this.profileForm.value.newPass);
    }
    user?.save()
      .then(() => {
        // Execute any logic that should take place after the object is saved.
        alert('Profile has been updated');
      }, (error) => {
        // Execute any logic that should take place if the save fails.
        // error is a Parse.Error with an error code and message.
        alert('Failed to update profile: ' + error.message);
      });
    console.warn('Your profile has been updated', this.profileForm.value);
    this.profileForm.reset();
  }

  onFileSelected(event: Event) {

  }
}
