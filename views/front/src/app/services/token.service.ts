import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  static PassingTOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTdmNjU5MThiZTQwYWNhNDA3YzRjOTIiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDI5NTgyMDUsImV4cCI6MzE3Mjc4OTU4MjA1fQ.W8vCrmshC5UDBT5Pzc7hxmYuv5RgKT2tMblB52oCK7w';
  static TOKEN = '';
  static type = 'user';
  static code = 200;
  constructor() { }
}
