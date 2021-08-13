import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-invitation-page',
  templateUrl: './invitation-page.component.html',
  styleUrls: ['./invitation-page.component.css']
})
export class InvitationPageComponent implements OnInit {
  tripOwner: any = '';
  tripTitle: any = 'Sommer Trip';
  tripCity: string = 'Siegen';
  tripMonth: string = 'October';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.tripOwner = this.route.snapshot.queryParams.tripOwner || 'John';
    let fragment = this.route.snapshot.fragment;
    if (fragment) {
      // get data from url #title#city#month
      let parts = fragment.split('#');
      this.tripTitle = parts[0];
      this.tripCity = parts[1];
      this.tripMonth = parts[2];
    }
  }
}
