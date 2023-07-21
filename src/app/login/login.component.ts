import { ManagementService } from './../management.service';
import { Component, OnInit } from '@angular/core';
import { CredentialslistService } from '../Credentials.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [CredentialslistService, ManagementService]
})
export class LoginComponent /* implements OnInit */  {
  Credentialsreceived: string[][] = [];
  userName: string = '';
  userPass: string = '';
  wrongCredPop: boolean=false;
  wrongCredCount : number=0;
  token : string ='';
  constructor(
    private CredentialsSvc: CredentialslistService,
    private router: Router) { }

  onUsernameChange(newUserN : string){
    this.wrongCredPop=false;
    this.userName=newUserN;
  }

  onPasswordChange(newPass : string){
    this.wrongCredPop=false;
    this.userPass=newPass;
  }

  validateInputs() {
    this.CredentialsSvc.login(this.userName,this.userPass).subscribe(
      {
        next: (response) => {
          console.log(response);
          this.token=response.token;
          this.CredentialsSvc.token=this.token;
          this.CredentialsSvc.saveTokenToSessionStorage();
          this.router.navigate(['/management']);

        },
        error: (error) => {
          console.error(error);
          this.wrongCredPop=true;
          }
        }
      
    );

  }

}
