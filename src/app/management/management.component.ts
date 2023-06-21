import { Component, OnInit } from '@angular/core';
import { AccountsListService } from '../accounts-list.service';


interface Account {
  FirstName: string;
  LastName: string;
  Email: any;
  Password: string;
  Birthday: string;
}

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css'],
  providers: [AccountsListService]
})
export class ManagementComponent implements OnInit {
  AccTable: Account[] = [];
  
  constructor(
    private AccountsList: AccountsListService
  ) { }

  ngOnInit(): void {
    this.AccTable = this.AccountsList.getAccountData();
  }

}
 


