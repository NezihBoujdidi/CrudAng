import { Component, OnInit } from '@angular/core';
import { CredentialslistService } from '../Credentials.service';
import { ManagementService } from '../management.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [CredentialslistService, ManagementService]
})
export class LoginComponent implements OnInit {
  Credentialsreceived: string[][] = [];
  username: string = '';
  password: string = '';
  valid = false;
  constructor(
    private CredentialsSvc: CredentialslistService,
    private router: Router) { }


  ngOnInit(): void {
    this.Credentialsreceived = this.CredentialsSvc.getCredentialslist()
  }

  saveData() {
    console.log(this.username);
    console.log(this.password);
    if (this.valid) {
      this.router.navigate(['/management']);
    }
  }

  validateInputs() {
    this.valid = false;
    for (var i = 0; i < this.Credentialsreceived.length; i++) {
      if (this.Credentialsreceived[i][0] == this.username && this.Credentialsreceived[i][1] == this.password) {
        this.valid = true;
        break;
      }
    }

  }

}
