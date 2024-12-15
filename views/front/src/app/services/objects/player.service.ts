import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ObjectId } from 'mongoose';
import { httpOptions } from './coach.service';


@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  apiUrl: string = "http://localhost:3000/";

  constructor(private http: HttpClient) { }

  


  getAllPlayersOfSpecificTeam(teamId: ObjectId): Observable<any[]>{
    console.log(`from the service the id is ${teamId}`);
    const url = `${this.apiUrl}playersWithSameTeam/${teamId}`;
    return this.http.get<any[]>(url, httpOptions);
  }

  addPlayer(player: any): Observable<any>{
    const url = `${this.apiUrl}player`;
    return this.http.post<any>(url, player, httpOptions);
  }

  deletePlayer(playerId: ObjectId): Observable<any> {
    const url = `${this.apiUrl}player/${playerId}`;

    // Send DELETE request
    return this.http.delete<any>(url, httpOptions);
  }

  updatePlayer(playerId: ObjectId, newData: any): Observable<any> {
    const url = `${this.apiUrl}player/${playerId}`;

    return this.http.patch<any>(url, newData, httpOptions);
  }

}
