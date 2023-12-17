import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { GoogleMapsModule } from '@angular/google-maps';
import { RouterModule, Routes } from '@angular/router';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminDropdownComponent } from './components/admin-dropdown/admin-dropdown.component';
import { ButtonComponent } from './components/button/button.component';
import { PlayerComponent } from './components/modification-categories/player/player.component';
import { TeamComponent } from './components/modification-categories/team/team.component';
import { StadiumComponent } from './components/modification-categories/stadium/stadium.component';
import { CoachComponent } from './components/modification-categories/coach/coach.component';
import { RefreeComponent } from './components/modification-categories/refree/refree.component';
import { CommentatorComponent } from './components/modification-categories/commentator/commentator.component';
import { LiveViewComponent } from './pages/live-view/live-view.component';
import { MapComponent } from './pages/map/map.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const appRoutes: Routes = [
  {path: '', component: MapComponent},
  {path: 'match/:data', component: LiveViewComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AdminDropdownComponent,
    ButtonComponent,
    PlayerComponent,
    TeamComponent,
    StadiumComponent,
    CoachComponent,
    RefreeComponent,
    CommentatorComponent,
    LiveViewComponent,
    MapComponent,
    SignInComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    GoogleMapsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
