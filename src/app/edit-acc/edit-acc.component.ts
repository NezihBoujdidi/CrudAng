import { Component, OnInit } from '@angular/core';
import { AccountsListService } from '../accounts-list.service';
import { Router } from '@angular/router';
import { ManagementService } from '../management.service';
import { CredentialslistService } from '../Credentials.service';

interface Account {
  id : number|null;
  firstName: string;
  lastName: string;
  email: any;
  password: string;
  dob: string;
}
interface AccountWithImage extends Account {
  imageId: number;
}

@Component({
  selector: 'app-edit-acc',
  templateUrl: './edit-acc.component.html',
  styleUrls: ['./edit-acc.component.css'],
  providers:[AccountsListService]
})
export class EditAccComponent implements OnInit{
  AccTable: Array<any>=[];
  SelectedRow: AccountWithImage | null = null;
  logoutPopUp: boolean=false;
  
  constructor(
    private AccountsList: AccountsListService,
    private router: Router,
    private ManagSvc: ManagementService,
    private CredentialsSvc : CredentialslistService
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


  routeToEdit(row: AccountWithImage ){
    this.router.navigate(['/createAcc']);
    this.SelectedRow = row;
    this.ManagSvc.SelectedAcc=this.SelectedRow;
    this.ManagSvc.saveSelectedAccountToSessionStorage();
  }

  DeleteLoadedAcc(){
    this.ManagSvc.deleteAccountFromSessionStorage();
  }

  logoutPop(){
    this.logoutPopUp=true;
  }

  logoutConfirmation(){
    this.CredentialsSvc.logout().subscribe({
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

  CancelOper(){
    this.logoutPopUp=false;
    this.router.navigate(['/editAcc']);
  }
  
}