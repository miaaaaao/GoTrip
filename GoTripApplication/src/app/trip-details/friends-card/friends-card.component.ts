import { Component, OnInit, Input } from '@angular/core';

import { GetFriendsService } from '../../services/get-friends.service';

@Component({
  selector: 'app-friends-card',
  templateUrl: './friends-card.component.html',
  styleUrls: ['./friends-card.component.css']
})
export class FriendsCardComponent implements OnInit {
  @Input() currentTrip:any;

  constructor(private getFriendsService: GetFriendsService) { 
    console.log("<<===>>")
    console.log(this.currentTrip)
  }

  ngOnInit(): void {
    if(!this.currentTrip){
      this.currentTrip = {
        invitedFriends: [] 
      }
     
    } else {
      
    }
    console.log('hey, check this')
    console.log(this.currentTrip)
    
    
  }

}
