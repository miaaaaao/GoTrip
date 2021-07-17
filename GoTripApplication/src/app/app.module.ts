import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ActiveTripCardComponent } from './dashboard/active-trip-card/active-trip-card.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ActiveTripCardComponent,

  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
