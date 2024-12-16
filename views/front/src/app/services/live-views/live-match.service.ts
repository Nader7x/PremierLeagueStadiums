import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ObjectId } from 'mongoose';
import { Match } from 'src/app/interfaces/match-interface';
import { TokenService } from '../token.service';

@Injectable({
  providedIn: 'root'
})
export class LiveMatchService {
  apiUrl: string = "http://localhost:3000/";

  constructor(private http: HttpClient) {}

  getSortedEvents(matchId: ObjectId): Observable<any>{
    const url = `${this.apiUrl}sortedEvents/${matchId}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TokenService.TOKEN}`
      })
    };
    return this.http.get<any>(url, httpOptions);
  }

  getLiveMatches(): Observable<Match[]>{
    const url = `${this.apiUrl}matchesLive`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TokenService.TOKEN}`
      })
    };
    return this.http.get<Match[]>(url, httpOptions);
  }

  getMatchWithAllData(matchId: ObjectId): Observable<Match>{
    const url = `${this.apiUrl}matchWithAllData/${matchId}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TokenService.TOKEN}`
      })
    };
    return this.http.get<Match>(url, httpOptions);
  }

}
