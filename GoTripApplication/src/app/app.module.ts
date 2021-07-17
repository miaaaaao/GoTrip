import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NewTripFormComponent } from './new-trip-form/new-trip-form.component';


@NgModule({
  declarations: [
    AppComponent,
    NewTripFormComponent,

  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
