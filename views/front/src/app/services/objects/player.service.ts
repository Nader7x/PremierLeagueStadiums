import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    const url = `${this.apiUrl}showAllTeams`;
    return this.http.get<any[]>(url);
  }

  addPlayer(player: any): Observable<any>{
    // console.log(player);
    const url = `${this.apiUrl}addPlayer`;
    // console.log(`Trying to post now to ${url}`);
    // console.log(typeof(player));
    return this.http.post<any>(url, player, httpOptions);
  }
}
