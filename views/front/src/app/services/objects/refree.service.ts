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
export class RefreeService {
  apiUrl: string = "http://localhost:3000/";
  constructor(private http: HttpClient) {

  }

  getAllReferees(): Observable<any[]>{
    const url = `${this.apiUrl}showAllReferees`;
    return this.http.get<any[]>(url);
  }

  addReferee(referee: any): Observable<any>{
    const url = `${this.apiUrl}addReferee`;
    console.log("Trying to post now");
    return this.http.post<any>(url, referee, httpOptions);
  }

  deleteReferee(refereeId: string): Observable<any> {
    const url = `${this.apiUrl}deleteReferee/${refereeId}`;
    
    // Send DELETE request
    return this.http.delete<any>(url, httpOptions);
  }
  
}
