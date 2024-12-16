import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { httpOptions } from './coach.service';
import { TokenService } from '../token.service';

@Injectable({
  providedIn: 'root'
})
export class CommentatorService {
  apiUrl: string = "http://localhost:3000/";
  constructor(private http: HttpClient) {}

  getAllCommentators(): Observable<any[]>{
    const url = `${this.apiUrl}commentators`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TokenService.TOKEN}`
      })
    };
    return this.http.get<any[]>(url, httpOptions);
  }

  addCommentator(commentator: any): Observable<any>{
    const url = `${this.apiUrl}commentator`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TokenService.TOKEN}`
      })
    };
    return this.http.post<any>(url, commentator, httpOptions);
  }

  deleteCommentator(commentatorId: any): Observable<any> {
    const url = `${this.apiUrl}commentator/${commentatorId}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TokenService.TOKEN}`
      })
    };
    // Send DELETE request
    return this.http.delete<any>(url, httpOptions);
  }
}
