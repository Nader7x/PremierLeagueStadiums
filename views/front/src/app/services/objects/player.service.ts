import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ObjectId } from 'mongoose';
import { httpOptions } from './coach.service';
import { TokenService } from '../token.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  apiUrl: string = "http://localhost:3000/";

  constructor(private http: HttpClient) { }

  getAllPlayersOfSpecificTeam(teamId: ObjectId): Observable<any[]>{
    console.log(`from the service the id is ${teamId}`);
    const url = `${this.apiUrl}playersWithSameTeam/${teamId}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TokenService.TOKEN}`
      })
    };
    return this.http.get<any[]>(url, httpOptions);
  }

  addPlayer(player: any): Observable<any>{
    const url = `${this.apiUrl}player`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TokenService.TOKEN}`
      })
    };
    return this.http.post<any>(url, player, httpOptions);
  }

  deletePlayer(playerId: ObjectId): Observable<any> {
    const url = `${this.apiUrl}player/${playerId}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TokenService.TOKEN}`
      })
    };
    // Send DELETE request
    return this.http.delete<any>(url, httpOptions);
  }

  updatePlayer(playerId: ObjectId, newData: any): Observable<any> {
    const url = `${this.apiUrl}player/${playerId}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TokenService.TOKEN}`
      })
    };
    return this.http.patch<any>(url, newData, httpOptions);
  }

}
