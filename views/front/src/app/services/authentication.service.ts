import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json',
    }
  )
}

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  apiUrl: string = "http://localhost:3000/";

  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) { }

  async signIn(credentials: any): Promise<any> {
    const url = `${this.apiUrl}login`;
    console.log(`Here we are trying to do the right thing`);
    
    return this.http.post<any>(url, credentials, httpOptions).pipe(
      catchError(error => {
        alert('invalid username or password');
        const statusCode = error.status;
        console.log(`The status code is ${statusCode}`);
        return throwError(error);
      })
    ).subscribe(
      (response: any) => {
        // Handling the successful response
        console.log(`The status code is ${response.status}`);
        TokenService.code = response.status;
        TokenService.TOKEN = response.token;
        console.log(`The new token is ${TokenService.TOKEN}`);
        console.log(`The successful response is ${response.token}`);
        
        // Assuming the 'type' property is part of the success response
        const keys = Object.keys(response);
        let t: string = keys[0];
        TokenService.type = t;
        console.log(`The type of the signed-in token is ${TokenService.type}`);
        if(TokenService.TOKEN !== '') {
          this.cookieService.set('token', TokenService.TOKEN, 7, '/'); // Save token in cookies for 1 week
          this.router.navigate(['/map']);
        } else {
          alert('Incorrect Username or Password');
        }
      },
      error => {
        // Handling the error response
        console.error(`An error occurred: ${error.message}`);
      }
    );
  }
  

  signUp(credentials: any): any{
    const url = `${this.apiUrl}register`;
    console.log(`Here we are trying to do the right thing`);
    return this.http.post<any>(url, credentials, httpOptions).pipe(
      catchError(error =>{
        const statusCode = error.status;
        console.log(`The status code is ${statusCode}`);
        return throwError(error);
      })
    ).subscribe( response => {
      //handling the successful response
      console.log(`The status code is ${response.status}`);
      TokenService.code = response.status;
      TokenService.TOKEN = response.token;
      console.log(`The new token is ${TokenService.TOKEN}`);
      console.log(`The successful response is ${response.token}`);
      
      // Assuming the 'type' property is part of the success response
      const keys = Object.keys(response);
      let t: string = keys[0];
      TokenService.type = t;
      console.log(`The type of the signed-up token is ${TokenService.type}`);
      if(TokenService.TOKEN !== '') {
        this.cookieService.set('token', TokenService.TOKEN, 7, '/'); // Save token in cookies for 1 week
        this.router.navigate(['/map']);
      } else {
        alert('Registration failed');
      }
    });
  }
}
