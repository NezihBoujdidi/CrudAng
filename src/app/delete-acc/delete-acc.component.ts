import { Component, OnInit } from '@angular/core';
import { ManagementService } from '../management.service';
import { AccountsListService } from '../accounts-list.service';
import { Router } from '@angular/router';

interface Account {
  FirstName: string;
  LastName: string;
  Email: any;
  Password: string;
  Birthday: string;
}

@Component({
  selector: 'app-delete-acc',
  templateUrl: './delete-acc.component.html',
  styleUrls: ['./delete-acc.component.css'],
  providers: [ManagementService, AccountsListService]
})
export class DeleteAccComponent implements OnInit {
  AccTable: Account[] = [];
  popUp: boolean = false;

  OnDeleteAcc: Account = {
    FirstName: '',
    LastName: '',
    Email: '',
    Password: '',
    Birthday: ''
  };

  constructor(
    private ManagSvc: ManagementService,
    private AccountsList: AccountsListService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.AccTable = this.AccountsList.getAccountData();
    this.popUp=false;
  }

  DeletePopUp(row: Account) {
    this.ManagSvc.saveSelectedAccountToSessionStorage();
    this.OnDeleteAcc=row;
    this.popUp = true;
  }

  DeleteConfirmation() {
    const index = this.AccountsList.Accounts.findIndex(acc => acc.FirstName === this.OnDeleteAcc.FirstName && acc.Password === this.OnDeleteAcc.Password);
    this.AccountsList.Accounts.splice(index,1);
    this.AccountsList.saveAccountsToSessionStorage();
    this.router.navigate(['/management']);
  }

  CancelOp() {
    this.popUp=false;
    this.router.navigate(['/deleteAcc']);
  }
}