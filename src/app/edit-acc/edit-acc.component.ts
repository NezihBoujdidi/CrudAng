import { Component, OnInit } from '@angular/core';
import { AccountsListService } from '../accounts-list.service';
import { Router } from '@angular/router';
import { ManagementService } from '../management.service';

interface Account {
  FirstName: string;
  LastName: string;
  Email: any;
  Password: string;
  Birthday: string;
}

@Component({
  selector: 'app-edit-acc',
  templateUrl: './edit-acc.component.html',
  styleUrls: ['./edit-acc.component.css'],
  providers:[AccountsListService]
})
export class EditAccComponent implements OnInit{
  AccTable: Account[] = [];
  SelectedRow: Account | null = null;
  
  constructor(
    private AccountsList: AccountsListService,
    private router: Router,
    private ManagSvc: ManagementService
  ) { }

  ngOnInit(): void {
    this.AccTable = this.AccountsList.getAccountData();
  }

  routeToEdit(row: Account ){
    this.router.navigate(['/createAcc']);
    this.SelectedRow = row;
    this.ManagSvc.SelectedAcc=this.SelectedRow;
    this.ManagSvc.saveSelectedAccountToSessionStorage();
  }

  DeleteLoadedAcc(){
    this.ManagSvc.deleteAccountFromSessionStorage();
  }
  
}