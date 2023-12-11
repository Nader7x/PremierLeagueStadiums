import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
