import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { httpOptions } from './coach.service';
import { ObjectId } from 'mongoose';
import { TokenService } from '../token.service';

@Injectable({
  providedIn: 'root'
})
export class RefreeService {
  apiUrl: string = "http://localhost:3000/";
  constructor(private http: HttpClient) {

  }

  getAllReferees(): Observable<any[]>{
    const url = `${this.apiUrl}referees`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TokenService.TOKEN}`
      })
    };
    return this.http.get<any[]>(url, httpOptions);
  }

  addReferee(referee: any): Observable<any>{
    const url = `${this.apiUrl}referee`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TokenService.TOKEN}`
      })
    };
    return this.http.post<any>(url, referee, httpOptions);
  }

  deleteReferee(refereeId: ObjectId): Observable<any> {
    const url = `${this.apiUrl}referee/${refereeId}`;
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
