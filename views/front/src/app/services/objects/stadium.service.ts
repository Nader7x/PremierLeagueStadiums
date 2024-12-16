import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { httpOptions } from './coach.service';
import { ObjectId } from 'mongoose';
import { TokenService } from '../token.service';

@Injectable({
  providedIn: 'root'
})
export class StadiumService {
  apiUrl: string = "http://localhost:3000/";

  constructor(private http: HttpClient) {}

  getStadiumHistoryMatches(stadiumId: ObjectId): Observable<any[]>{
    const url = `${this.apiUrl}stadiumHistoryMatches/${stadiumId}`;
    console.log(url);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TokenService.TOKEN}`
      })
    };
    return this.http.get<any[]>(url, httpOptions);
  }

  getAllStadiums(): Observable<any[]>{
    const url = `${this.apiUrl}stadiumsWithTeam`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TokenService.TOKEN}`
      })
    };
    return this.http.get<any[]>(url, httpOptions);
  }

  addStadium(stadium: any): Observable<any>{
    // console.log(player);
    const url = `${this.apiUrl}stadium`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TokenService.TOKEN}`
      })
    };
    // console.log(`Trying to post now to ${url}`);
    // console.log(typeof(player));
    return this.http.post<any>(url, stadium, httpOptions);
  }

  deleteStadium(stadiumId: ObjectId): Observable<any> {
    const url = `${this.apiUrl}stadium/${stadiumId}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TokenService.TOKEN}`
      })
    };
    // Send DELETE request
    return this.http.delete<any>(url, httpOptions);
  }


}
