import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.css']
})
export class InvitationComponent implements OnInit {
  @Input('friendEmail') friendEmail:any;
  constructor() { }

  ngOnInit(): void {
  }

}
