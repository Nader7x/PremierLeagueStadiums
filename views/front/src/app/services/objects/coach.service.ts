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
export class CoachService {
  apiUrl: string = "http://localhost:3000/";
  constructor(private http: HttpClient) {

  }

  getAllCoaches(): Observable<any[]>{
    const url = `${this.apiUrl}coaches`;
    return this.http.get<any[]>(url);
  }

  addCoach(coach: any): Observable<any>{
    const url = `${this.apiUrl}coach`;
    console.log("Trying to post now");
    return this.http.post<any>(url, coach, httpOptions);
  }

  deleteCoach(coachId: string): Observable<any> {
    const url = `${this.apiUrl}coach/${coachId}`;
    
    // Send DELETE request
    return this.http.delete<any>(url, httpOptions);
  }
  
}
