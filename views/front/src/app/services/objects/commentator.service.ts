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
export class CommentatorService {
  apiUrl: string = "http://localhost:3000/";
  constructor(private http: HttpClient) {

  }

  addCommentator(commentator: any): Observable<any>{
    const url = `${this.apiUrl}addCommentator`;
    console.log("Trying to post now");
    return this.http.post<any>(url, commentator, httpOptions);
  }
}
