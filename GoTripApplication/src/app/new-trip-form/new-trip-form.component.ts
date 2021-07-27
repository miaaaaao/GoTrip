import { Component, OnInit } from '@angular/core';
import {germany} from './cities/germany';
import {createNewTrip} from '../newTripForm.service';

@Component({
  selector: 'app-new-trip-form',
  templateUrl: './new-trip-form.component.html',
  styleUrls: ['./new-trip-form.component.css']
})
export class NewTripFormComponent implements OnInit {
  selectedCity:Number = 0;
  cities:{id:Number, name:String}[] = [];
  invitedFriend: String = '';
  invitedFriends: {}[] = [];

  constructor(private createNewTrip: createNewTrip) {
    for(let i =0; i<germany.length; i++){
      this.cities.push({
        id: i+1,
        name: germany[i]
      })
    }
   }

  ngOnInit(): void {
    this.invitedFriends = this.createNewTrip.invitedFriends;
  }

  invite(){
    this.createNewTrip.invite(this.invitedFriend);
  }

  

}
