import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { acceptInvitation } from '../../services/acceptInvitation.service';
import { rejectInvitation } from '../../services/rejectInvitation.service';

@Component({
  selector: 'app-active-trip-card',
  templateUrl: './active-trip-card.component.html',
  styleUrls: ['./active-trip-card.component.css']
})
export class ActiveTripCardComponent implements OnInit {
  invitedUser: boolean = true;
  @Input('tripPlan') tripPlan:any;
  @Output() updateDashboad = new EventEmitter;

  constructor(private acceptInvitation: acceptInvitation, private rejectInvitation: rejectInvitation, private router: Router) { }

  ngOnInit(): void {
   
  }

  /*
  * Call a function on the service folder to reject invitation
  */
  async declineInvitation(el:any){
    await this.rejectInvitation.reject(this.tripPlan.id)
    this.updateDashboad.emit() // event emited to refresh the dashboard
    el.stopPropagation() // Make the button not activate the trip details function
  }
  /*
  * Call a function on the service folder to accept invitation
  */
  async acceptInvitationButton(el:any){
    await this.acceptInvitation.accept(this.tripPlan.id)
    this.updateDashboad.emit() // event emited to refresh the dashboard
    el.stopPropagation() // Make the button not activate the trip details function
  }

  /*
  * This function open the details page
  */
  showTripDetails(){
    this.router.navigate(['/details', this.tripPlan.id,'sights' ])
    
  }

}
