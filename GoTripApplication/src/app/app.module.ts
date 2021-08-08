import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { DatetimerangepickerModule } from "angular-datetimerangepicker";

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ActiveTripCardComponent } from './dashboard/active-trip-card/active-trip-card.component';
import { NewTripFormComponent } from './new-trip-form/new-trip-form.component';
import { CreateNewTripPlanButtonComponent } from './dashboard/create-new-trip-plan-button/create-new-trip-plan-button.component';
import { OldTripCardComponent } from './dashboard/old-trip-card/old-trip-card.component';

import { getTrip } from './getTrip.service';
import { createNewTrip } from './newTripForm.service';
import { currentUser } from './getCurrentUserData.service';

import { Router, RouterModule, Routes } from '@angular/router';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { ResetPageComponent } from './pages/reset-page/reset-page.component';
import { BackgroundImageComponent } from './pages/background-image/background-image.component';
import { InvitationComponent } from './new-trip-form/invitation/invitation.component';
import { DatetimepickerComponent } from './new-trip-form/datetimepicker/datetimepicker.component';
import { InvitationPageComponent } from './pages/invitation-page/invitation-page.component';
import { acceptInvitation } from './services/acceptInvitation.service';

//This is the route array
const appRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'create', component: NewTripFormComponent },
  { path: '', component: LoginPageComponent },
  { path: 'signup', component: SignUpPageComponent },
  { path: 'reset', component: ResetPageComponent },
  { path: 'invitation', component: InvitationPageComponent },
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
    acceptInvitation
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
