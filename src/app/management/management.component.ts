import { CredentialslistService } from './../Credentials.service';
import { Component, OnInit } from '@angular/core';
import { AccountsListService } from '../accounts-list.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css'],
  providers: [AccountsListService]
})
export class ManagementComponent implements OnInit {
  AccTable: Array<any> = [];
  isValid: boolean = false;
  logoutPopUp: boolean = false;
  imageSrc: string='';

  constructor(
    private AccountsList: AccountsListService,
    private credentialsService: CredentialslistService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.AccountsList.getAccounts().subscribe((data) => {
      this.AccTable = data;
      this.AccTable.forEach((account: any) => {
        const id = account.imageId;
        this.AccountsList.getImage(id).subscribe({
          next: (response : Blob) => {
            const reader = new FileReader();
            reader.onload = () => {
              account.imageSrc= reader.result as string;
            };
            reader.readAsDataURL(response);
          },
          error: (error) => {
            console.error(error);
          }
        }
        );
      }
      );
    });
  }


  logoutPop() {
    this.logoutPopUp = true;
  }

  logoutConfirmation() {
    this.credentialsService.logout().subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate(['/homePage']);
      },
      error: (error) => {
        console.error(error);
      }
    }
    );
  }

  CancelOper() {
    this.logoutPopUp = false;
    this.router.navigate(['/management']);
  }


}



