import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
<<<<<<< HEAD
import { DashboardComponent } from './dashboard/dashboard.component';
import { ActiveTripCardComponent } from './dashboard/active-trip-card/active-trip-card.component';
=======
import { NewTripFormComponent } from './new-trip-form/new-trip-form.component';
>>>>>>> bb6c0341113bfa4dffec922702a53c7b4342c993


@NgModule({
  declarations: [
    AppComponent,
<<<<<<< HEAD
    DashboardComponent,
    ActiveTripCardComponent,
=======
    NewTripFormComponent,
>>>>>>> bb6c0341113bfa4dffec922702a53c7b4342c993

  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
