import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input()
  user: string;
  visibility: string;
  constructor()  {
    this.user = '';
    this.visibility = "invisible";
  }

  ngOnInit(): void {
   
  }

}
