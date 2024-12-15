import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  standalone: true,
  imports: [
    FormsModule
  ],
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  username: string = '';
  password: string = '';

  constructor(private authenticationService: AuthenticationService, private router: Router){}

  async signIn(){

    if(!this.username || !this.password){
      alert('Please Enter all fields!!!');
      return;
    }

    const credentials = {
      username: this.username,
      password: this.password
    }
    this.username = '';
    this.password = '';
    this.authenticationService.signIn(credentials);

  }

  goToSignUpPage(){
    this.router.navigate(['/signUp']);
  }

}
