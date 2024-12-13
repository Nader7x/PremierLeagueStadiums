import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable} from 'rxjs';
import { ObjectId } from 'mongoose';
import { httpOptions } from './coach.service';



@Injectable({
  providedIn: 'root'
})
export class TeamService {
  apiUrl: string = "http://localhost:3000/";

  constructor(private http: HttpClient) { }

  getAllTeams(): Observable<any[]>{

    const url = `${this.apiUrl}teams`;
    return this.http.get<any[]>(url, httpOptions);
  }

  getTeamsWithoutStadiums(): Observable<any[]>{
    const url = `${this.apiUrl}teamsWithNoStadium`;
    return this.http.get<any[]>(url, httpOptions);
  }

  getAllTeamsWithPlayers(): Observable<any[]>{
    const url = `${this.apiUrl}teamsWithPlayers`;
    return this.http.get<any[]>(url, httpOptions);
  }

  addTeam(team: any): Observable<any>{
    const url = `${this.apiUrl}team`;
    return this.http.post<any>(url, team, httpOptions);
  }

  deleteTeam(teamId: ObjectId): Observable<any> {
    const url = `${this.apiUrl}team/${teamId}`;
    // Send DELETE request
    return this.http.delete<any>(url, httpOptions);
  }

  updateTeam(teamId: ObjectId, newData: any): Observable<any> {
    const url = `${this.apiUrl}team/${teamId}`;

    return this.http.patch<any>(url, newData, httpOptions);
  }

}
