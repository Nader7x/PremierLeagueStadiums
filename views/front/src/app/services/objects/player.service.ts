import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ObjectId } from 'mongoose';

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
export class PlayerService {
  apiUrl: string = "http://localhost:3000/";

  constructor(private http: HttpClient) { }

  getAllTeams(): Observable<any[]>{
    const url = `${this.apiUrl}teams`;
    return this.http.get<any[]>(url);
  }

  getAllPlayersOfSpecificTeam(teamId: ObjectId): Observable<any[]>{
    const url = `${this.apiUrl}players/${teamId}`;
    return this.http.get<any[]>(url);
  }

  addPlayer(player: any): Observable<any>{
    // console.log(player);
    const url = `${this.apiUrl}player`;
    // console.log(`Trying to post now to ${url}`);
    // console.log(typeof(player));
    return this.http.post<any>(url, player, httpOptions);
  }

  deletePlayer(playerId: ObjectId): Observable<any> {
    const url = `${this.apiUrl}player/${playerId}`;

    // Send DELETE request
    return this.http.delete<any>(url, httpOptions);
  }

  updatePlayer(playerId: ObjectId, newData: any): Observable<any> {
    console.log(`Team Id -> ${playerId}`);
    console.log(`data --> ${newData.name}`);
    const url = `${this.apiUrl}team/${playerId}`;

    return this.http.patch<any>(url, newData, httpOptions);
  }

}
