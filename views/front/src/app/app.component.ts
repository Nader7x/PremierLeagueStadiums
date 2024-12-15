import { Component, OnInit } from '@angular/core';
import { environment } from "../environments/environment";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { TokenService } from './services/token.service';
import {Router, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {


  constructor(private tokenService: TokenService, private router: Router) {
    console.log(`The user type is ${TokenService.type}`);
  }

  goToAdminPage(){
    console.log('Going to Admin page');
    this.router.navigate(['/admin']).then();
  }

  goToMap(){
    console.log('going to map page');
    this.router.navigate(['/map']).then();
  }

  personType: string =TokenService.type;
  title = 'af-notification';
  message:any = null;
  ngOnInit(): void {
    this.requestPermission();
    console.log('going to listen now');
    this.listen();
  }
  requestPermission() {
    const messaging = getMessaging();
    getToken(messaging,
      { vapidKey: environment.firebase.vapidKey}).then(
      (currentToken) => {
        if (currentToken) {
          console.log("Hurraaa!!! we got the token.....");
          console.log(currentToken);
        } else {
          console.log('No registration token available. Request permission to generate one.');
        }
      }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
  }
  listen() {
    console.log('listen is in now');
    const messaging = getMessaging();
    console.log(`messaging is ${messaging}`);
    onMessage(messaging, (payload) => {
      console.log(`payload ${payload}`);
      console.log('Message received. ', payload);
      this.message=payload;
      new Notification(payload.notification!.title!,payload.notification!.body as NotificationOptions);
    });
  }
}
