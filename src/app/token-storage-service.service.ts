import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../environments/environment';

const TOKEN_KEY = "access-token";
const TOKEN_URL = environment.apiHost + environment.apiGenerateToken;
const USERNAME = "foo";
const PASSWORD = "foo";

@Injectable({
  providedIn: 'root'
})
export class TokenStorageServiceService {

  constructor(private http: HttpClient) { }

  private saveToken(token: string){
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  private isTokenAvailable(): boolean {
    return window.sessionStorage.getItem(TOKEN_KEY) != null;
  }

  public generateToken(): Observable<any> {
    return this.http.post(TOKEN_URL, 
      {username: USERNAME, password: PASSWORD}, 
      {headers: new HttpHeaders({"Content-Type": "application/json"})});
  }
}
