import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable} from 'rxjs';
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
export class TeamService {
  apiUrl: string = "http://localhost:3000/";

  constructor(private http: HttpClient) { }

  getAllCoaches(): Observable<any[]>{
    const url = `${this.apiUrl}showAllCoaches`;
    return this.http.get<any[]>(url);
  }

  getAllTeamsWithPlayers(): Observable<any[]>{
    const url = `${this.apiUrl}showAllTeamsWithPlayers`;
    return this.http.get<any[]>(url);
  }

  addTeam(team: any): Observable<any>{
    console.log(`${team.homeKit}  ${team.name}  ${team.awayKit}  ${team.coach}`);
    console.log(team);
    const url = `${this.apiUrl}addTeam`;
    console.log(`Trying to post now to ${url}`);
    console.log(typeof(team));
    return this.http.post<any>(url, team, httpOptions);
  }

  deleteTeam(teamId: ObjectId): Observable<any> {
    const url = `${this.apiUrl}deleteTeam/${teamId}`;
    
    // Send DELETE request
    return this.http.delete<any>(url, httpOptions);
  }

  updateTeam(teamId: ObjectId, newData: any): Observable<any> {
    console.log(`Team Id -> ${teamId}`);
    console.log(`data --> ${newData.name}`);
    const url = `${this.apiUrl}updateTeam/${teamId}`;

    return this.http.patch<any>(url, newData, httpOptions);
  }

}
