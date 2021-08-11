import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { createNewTrip } from '../services/newTripForm.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {
  @Input('origin') origin:any;

  constructor(private router: Router, private route: ActivatedRoute, private createNewTrip: createNewTrip ) { }

  ngOnInit(): void {
    
  }
  /*
  * Function to sen dthe user to teh previous page. It uses the origin variable to
  * decide to whenre they shoudl go back.
  */
  goBack(){
    if(this.origin == 'newTripForm' || this.origin == 'tripDetails') this.createNewTrip.cleanInvitationList(); // Clean the email list
    this.router.navigate(['../dashboard'])
  }

}
