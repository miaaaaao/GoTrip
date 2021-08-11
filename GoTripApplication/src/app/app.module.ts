import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { DatetimerangepickerModule } from "angular-datetimerangepicker";
import { Router, RouterModule, Routes } from '@angular/router';

import { getTrip } from './services/getTrip.service';
import { createNewTrip } from './services/newTripForm.service';
import { currentUser } from './services/getCurrentUserData.service';
import { getTripDetails } from '../app/services/getTripDetails.service';
import { acceptInvitation } from './services/acceptInvitation.service';
import { rejectInvitation } from './services/rejectInvitation.service';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ActiveTripCardComponent } from './dashboard/active-trip-card/active-trip-card.component';
import { NewTripFormComponent } from './new-trip-form/new-trip-form.component';
import { CreateNewTripPlanButtonComponent } from './dashboard/create-new-trip-plan-button/create-new-trip-plan-button.component';
import { OldTripCardComponent } from './dashboard/old-trip-card/old-trip-card.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { ResetPageComponent } from './pages/reset-page/reset-page.component';
import { BackgroundImageComponent } from './pages/background-image/background-image.component';
import { InvitationComponent } from './new-trip-form/invitation/invitation.component';
import { DatetimepickerComponent } from './new-trip-form/datetimepicker/datetimepicker.component';
import { InvitationPageComponent } from './pages/invitation-page/invitation-page.component';
import { TripDetailsComponent } from './trip-details/trip-details.component';
import { AllSightsComponent } from './trip-details/all-sights/all-sights.component';
import { MapComponent } from './trip-details/map/map.component';
import { NotesComponent } from './trip-details/notes/notes.component';
import { BasicInfoComponent } from './trip-details/basic-info/basic-info.component';
import { NotificationBarComponent } from './trip-details/notification-bar/notification-bar.component';

//This is the route array
const appRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'create', component: NewTripFormComponent },
  { path: '', component: LoginPageComponent },
  { path: 'signup', component: SignUpPageComponent },
  { path: 'reset', component: ResetPageComponent },
  { path: 'invitation', component: InvitationPageComponent },
  { path: 'details/:id', component: TripDetailsComponent, children: [
    {path: 'sights', component: AllSightsComponent},
    {path: 'map', component: MapComponent},
    {path: 'notes', component: NotesComponent},

  ] }
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ActiveTripCardComponent,
    NewTripFormComponent,
    CreateNewTripPlanButtonComponent,
    OldTripCardComponent,
    BreadcrumbComponent,
    LoginPageComponent,
    SignUpPageComponent,
    ResetPageComponent,
    BackgroundImageComponent,
    InvitationComponent,
    DatetimepickerComponent,
    InvitationPageComponent,
    TripDetailsComponent,
    AllSightsComponent,
    MapComponent,
    NotesComponent,
    BasicInfoComponent,
    NotificationBarComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    NgSelectModule,
    DatetimerangepickerModule,
    FormsModule,
  ],
  providers: [
    getTrip, 
    createNewTrip, 
    currentUser,
    acceptInvitation,
    rejectInvitation,
    getTripDetails
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
