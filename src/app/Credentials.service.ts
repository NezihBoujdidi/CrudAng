import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CredentialslistService {
  token: string='';
  private readonly key = 'token';
  valid : boolean=true;
  private authUrl= `http://localhost:8888/api/V2/auth/authenticate`;
  
  constructor(private http : HttpClient ) { 
    this.loadTokenFromSessionStorage();
  }


  login(userName: string, userPass: string) : Observable<any> {
    return this.http.post(`${this.authUrl}`, { userName, userPass });
  }

  logout() : Observable<any> {
    this.loadTokenFromSessionStorage();
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    };
    return this.http.post(`http://localhost:8888/api/V2/auth/logout`, null , httpOptions);
  }

  checkExp() : Observable<any> {
    this.loadTokenFromSessionStorage();
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    };
    console.log("token: "+this.token);
    return this.http.get(`http://localhost:8888/api/V2/auth/checkTokenExp`,httpOptions);
  }
  
  loadTokenFromSessionStorage() {
    const storedToken = sessionStorage.getItem(this.key);
    if (storedToken) {
      this.token = JSON.parse(storedToken);
    }
  }

  saveTokenToSessionStorage() {
    sessionStorage.setItem(this.key, JSON.stringify(this.token));
  }

  deleteTokenFromSessionStorage() {
    sessionStorage.removeItem(this.key);
  }
  
  
  
}
