import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogInService {
  showLogin=true;
  constructor() { }
  setshowLogin(value : boolean){
    this.showLogin=value;
  }
  getshowLogin(){
    return this.showLogin;
  }
}
