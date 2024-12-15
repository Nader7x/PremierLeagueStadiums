import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ObjectId } from 'mongoose';
import { Match } from 'src/app/interfaces/match-interface';
import { httpOptions } from '../objects/coach.service';
import { TokenService } from '../token.service';

@Injectable({
  providedIn: 'root'
})
export class LiveMatchService {
  apiUrl: string = "http://localhost:3000/";

  constructor(private http: HttpClient) {}

  getSortedEvents(matchId: ObjectId): Observable<any>{
    const url = `${this.apiUrl}sortedEvents/${matchId}`;
    return this.http.get<any>(url, httpOptions);
  }

  getLiveMatches(): Observable<Match[]>{
    console.log(`before getting the live matches, the token is ${TokenService.TOKEN}`);
    const url = `${this.apiUrl}matchesLive`;
    return this.http.get<Match[]>(url, httpOptions);
  }

  getMatchWithAllData(matchId: ObjectId): Observable<Match>{
    const url = `${this.apiUrl}matchWithAllData/${matchId}`;
    return this.http.get<Match>(url, httpOptions);
  }

}
