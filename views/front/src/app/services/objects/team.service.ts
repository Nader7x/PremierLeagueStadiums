import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable} from 'rxjs';
import { ObjectId } from 'mongoose';
import { httpOptions } from './coach.service';
import { TokenService } from '../token.service';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  apiUrl: string = "http://localhost:3000/";

  constructor(private http: HttpClient) { }

  getAllTeams(): Observable<any[]>{
    const url = `${this.apiUrl}teams`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TokenService.TOKEN}`
      })
    };
    return this.http.get<any[]>(url, httpOptions);
  }

  getTeamsWithoutStadiums(): Observable<any[]>{
    const url = `${this.apiUrl}teamsWithNoStadium`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TokenService.TOKEN}`
      })
    };
    return this.http.get<any[]>(url, httpOptions);
  }

  getAllTeamsWithPlayers(): Observable<any[]>{
    const url = `${this.apiUrl}teamsWithPlayers`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TokenService.TOKEN}`
      })
    };
    return this.http.get<any[]>(url, httpOptions);
  }

  addTeam(team: any): Observable<any>{
    const url = `${this.apiUrl}team`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TokenService.TOKEN}`
      })
    };
    return this.http.post<any>(url, team, httpOptions);
  }

  deleteTeam(teamId: ObjectId): Observable<any> {
    const url = `${this.apiUrl}team/${teamId}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TokenService.TOKEN}`
      })
    };
    // Send DELETE request
    return this.http.delete<any>(url, httpOptions);
  }

  updateTeam(teamId: ObjectId, newData: any): Observable<any> {
    const url = `${this.apiUrl}team/${teamId}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TokenService.TOKEN}`
      })
    };
    return this.http.patch<any>(url, newData, httpOptions);
  }

}
