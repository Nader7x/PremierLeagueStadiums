import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  standalone: true,
  imports: [
    FormsModule
  ],
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  username: string = '';
  password: string = '';
  name: string = '';
  age: number = 0;

  constructor(private authenticationService: AuthenticationService, private router: Router){}

  signUp(){

    if(!this.username || !this.password || !this.name || !this.age){
      alert('Please Enter all fields!!!');
      return;
    }

    const credentials = {
      username: this.username,
      password: this.password,
      name: this.name,
      age: this.age
    }
    this.username = '';
    this.password = '';
    this.age = 0;
    this.name = '';

    this.authenticationService.signUp(credentials);
    this.router.navigate(['/']).then();
 }

 goBackToSignInScreen(){
    this.router.navigate(['/']).then();
 }


}
