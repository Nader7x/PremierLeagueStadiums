import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { httpOptions } from './coach.service';


@Injectable({
  providedIn: 'root'
})
export class CommentatorService {
  apiUrl: string = "http://localhost:3000/";
  constructor(private http: HttpClient) {}

  getAllCommentators(): Observable<any[]>{
    const url = `${this.apiUrl}commentators`;
    return this.http.get<any[]>(url, httpOptions);
  }

  addCommentator(commentator: any): Observable<any>{
    const url = `${this.apiUrl}commentator`;
    return this.http.post<any>(url, commentator, httpOptions);
  }


  deleteCommentator(commentatorId: any): Observable<any> {
    const url = `${this.apiUrl}commentator/${commentatorId}`;
    // Send DELETE request
    return this.http.delete<any>(url, httpOptions);
  }

  


  
}
