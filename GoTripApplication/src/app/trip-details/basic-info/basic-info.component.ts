import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { finishTrip } from '../../services/finishTrip.service';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.css']
})
export class BasicInfoComponent implements OnInit {
  @Input() title: string = '';
  @Input() city: string = '';
  @Input() isTheOwner: boolean = false;
  @Input() hasAcceptedInvitation: boolean = false;
  @Input() tripId = '';

  constructor(private finishTrip: finishTrip, private router: Router) {
   
   }

  ngOnInit(): void {

  }

  async setTripAsFinished(){
    if(this.tripId == '') return // Stops the function if there is no ID saved
    await this.finishTrip.markAsFinished(this.tripId) // Run the Parse function to change finished from true to false
    this.router.navigate(['../../dashboard']) // Go back to dasboard after change to finished
  }

}
