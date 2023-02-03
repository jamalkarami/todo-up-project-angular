import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseURL: string = environment.apiURL;
  user : User;
  token : string;

  constructor(private mHttpClient: HttpClient) { }

  /**
   * @description Authenticate using a username and password
   * @param username 
   * @param password 
   * @returns 
   */
  login(email: string, password: string): Observable<{token : string, user : User}> {
    const body = new HttpParams()
      .set('email', email)
      .set('password', password);

    return this.mHttpClient.post<{token : string, user : User}>(`${this.baseURL}signin`, body, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }
  /**
   * @description Create a new user 
   * @param user 
   * @returns 
   */
  signup(user : User): Observable<{token : string, user : User}>{
    return this.mHttpClient.post<{token : string, user : User}>(`${this.baseURL}signup`, user);
  }
}
