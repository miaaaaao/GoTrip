import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit {
  tripId: string='';

  constructor(private router: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.tripId = this.activeRoute.snapshot.params['id']

  }

}
