import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  @Input()
  user: string;
  buttonText: string;
  link: string;
  visibility: string;
  constructor()  {
    this.user = "NA"
    this.buttonText = "";
    this.link = "";
    this.visibility = "invisible";
  }

  ngOnInit(): void {
    if (this.user == "NA")
    {
      this.buttonText = "Log in to plan now";
      this.link = "todo";
      this.visibility = "invisible";
    }
    else
    {
      this.buttonText = "New Trip";
      this.link = "todo";
      this.visibility = "visible";
    }
  }
}
