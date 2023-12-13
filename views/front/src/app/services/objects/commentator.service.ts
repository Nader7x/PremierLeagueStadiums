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
export class CommentatorService {
  apiUrl: string = "http://localhost:3000/";
  constructor(private http: HttpClient) {}

  getAllCommentators(): Observable<any[]>{
    const url = `${this.apiUrl}showAllCommentators`;
    return this.http.get<any[]>(url);
  }

  addCommentator(commentator: any): Observable<any>{
    const url = `${this.apiUrl}addCommentator`;
    console.log("Trying to post now");
    return this.http.post<any>(url, commentator, httpOptions);
  }


  deleteCommentator(commentatorId: ObjectId): Observable<any> {
    console.log(`from deleteCommentator the commentator id is ${commentatorId}`);
    const url = `${this.apiUrl}deleteCommentator/${commentatorId}`;
    
    // Send DELETE request
    return this.http.delete<any>(url, httpOptions);
  }

  


  
}
