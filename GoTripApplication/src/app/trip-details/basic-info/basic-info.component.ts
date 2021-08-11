import { Component, Input, OnInit } from '@angular/core';


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
  isTripOwner: boolean = false;
  constructor() {
   
    
   }

  ngOnInit(): void {

  }

}
