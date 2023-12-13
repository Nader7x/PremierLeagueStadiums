import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json'
    }
  )
}

@Injectable({
  providedIn: 'root'
})
export class StadiumService {
  apiUrl: string = "http://localhost:3000/";

  constructor(private http: HttpClient) {}

  addStadium(stadium: any): Observable<any>{
    // console.log(player);
    const url = `${this.apiUrl}addStadium`;
    // console.log(`Trying to post now to ${url}`);
    // console.log(typeof(player));
    return this.http.post<any>(url, stadium, httpOptions);
  }
}
