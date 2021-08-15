import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { getTripDetails } from '../services/getTripDetails.service';
import { VoteBudgetService } from '../services/vote-budget.service';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit {
  tripId: string='';
  title: string='';
  city: string='';
  isTheOwner = false;
  hasAcceptedInvitation = true;
  hasReceivedData: boolean = false; // This is used to avoid load components with empty data
  currentTripFullData: any = null; // object with all information about the trip
  private updateUIBudget: any; // update UI after some change is made in the budget

  constructor(private router: Router, private activeRoute: ActivatedRoute, private getTripDetails: getTripDetails, private voteBudgetService:VoteBudgetService) { 
    this.activeRoute.params.subscribe(el=> this.tripId = el['id']) // Get id from the URL

  }

  getInfoAboutThisTrip(){
    /*
    * Get information from Parse server to fill the information about the trip
    */
    if(this.tripId !== ''){
      this.getTripDetails.getBasicInfo(this.tripId)
      .then(()=>{
        this.title = this.getTripDetails.currentTrip.title;
        this.city = this.getTripDetails.currentTrip.destination;
        this.isTheOwner = this.getTripDetails.currentTrip.status.isTheOwner;
        this.hasAcceptedInvitation = this.getTripDetails.currentTrip.status.hasAcceptedInvitation;
        this.hasReceivedData = this.getTripDetails.receiveddata;
        this.currentTripFullData = this.getTripDetails.currentTrip;
        //Save the curretn budget user's vote
        this.voteBudgetService.findUserBudgetVote().then(res=>{
          this.currentTripFullData.budget.userVotedOn = res
        })
        //Get all budget votes
        this.voteBudgetService.findTotalVotes().then(res=>{
          this.currentTripFullData.budget.totalVote.one = res?.dateOne;
          this.currentTripFullData.budget.totalVote.two = res?.dateTwo;
          this.currentTripFullData.budget.totalVote.three = res?.dateThree;
          console.log(res)
        })
        console.log('THIS IS THE FULL TRIP')
    console.log(this.currentTripFullData)
      });
    }
  }

  ngOnInit(): void {
    this.getInfoAboutThisTrip() // ===>> add this later

    this.updateUIBudget = this.voteBudgetService.updateUIBudgetChanged.subscribe(el=>{
      this.getInfoAboutThisTrip()
    })
  }

  ngOnDestroy(){
    /*
    * Delete information when user leave the page
    */
    this.tripId = '';
    this.title = '';    
    this.city = '';

    this.getTripDetails.cleanCurrentTrip() // Remove stored data on the service
    this.updateUIBudget.unsubscribe(); 
  }

  

}
