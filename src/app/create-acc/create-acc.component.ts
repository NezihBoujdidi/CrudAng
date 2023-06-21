import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { AccountsListService } from '../accounts-list.service';
import { ManagementService } from '../management.service';

interface Account {
  FirstName: string;
  LastName: string;
  Email: any;
  Password: string;
  Birthday: string;
}

@Component({
  selector: 'app-create-acc',
  templateUrl: './create-acc.component.html',
  styleUrls: ['./create-acc.component.css'],
  providers: [AccountsListService, ManagementService]
})
export class CreateAccComponent {
  OnEditAcc: Account = {
    FirstName: '',
    LastName: '',
    Email: '',
    Password: '',
    Birthday: ''
  };

  DataFilled: { FirstName: string, LastName: string, Email: FormControl, Password: string, Birthday: string } = {
    FirstName: '',
    LastName: '',
    Email: new FormControl<string>('', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]),
    Password: '',
    Birthday: ''
  }

  confirmPassword: string = '';

  constructor(
    private router: Router,
    private AccountsList: AccountsListService,
    private ManagSvc: ManagementService) { }

  validate() {
    if (this.DataFilled.Email.valid && this.DataFilled.Password == this.confirmPassword && this.DataFilled.Password!='') {
      this.AccountsList.CreateAccount(
        this.DataFilled.FirstName,
        this.DataFilled.LastName,
        this.DataFilled.Email.value,
        this.DataFilled.Password,
        this.DataFilled.Birthday
      );
      this.AccountsList.saveAccountsToSessionStorage();
      this.router.navigate(['/management']);
    }
  }

  onFirstNameChange(newFN: string) {
    this.DataFilled.FirstName = newFN;
  }

  onLastNameChange(newLN: string) {
    this.DataFilled.LastName = newLN;
  }


  onPasswordChange(newPass: string) {
    this.DataFilled.Password = newPass;
  }

  onBirthdayChange(newDate: string) {
    this.DataFilled.Birthday = newDate;
  }

  validateEdit() {
    if (this.DataFilled.Email.valid && this.DataFilled.Password == this.confirmPassword && this.DataFilled.Password!='') {
      const index = this.AccountsList.Accounts.findIndex(acc => acc.FirstName === this.OnEditAcc.FirstName && acc.Password === this.OnEditAcc.Password);
      if(this.DataFilled.FirstName==''){
        this.DataFilled.FirstName=this.OnEditAcc.FirstName;
      } 
      if(this.DataFilled.LastName==''){
        this.DataFilled.LastName=this.OnEditAcc.LastName;
      } 
      if(this.DataFilled.Birthday==''){
        this.DataFilled.Birthday=this.OnEditAcc.Birthday;
      } 
      this.AccountsList.EditAccount(
        this.DataFilled.FirstName,
        this.DataFilled.LastName,
        this.DataFilled.Email.value,
        this.DataFilled.Password,
        this.DataFilled.Birthday,
        index
      );
      this.AccountsList.saveAccountsToSessionStorage();
      this.router.navigate(['/management']);
    }
  }

  OnEditMode() {
    this.ManagSvc.loadSelectedAccountFromSessionStorage();
    if (this.ManagSvc.SelectedAcc != null) {
      this.OnEditAcc = this.ManagSvc.SelectedAcc;
    }
    return this.ManagSvc.SelectedAcc != null;
  }

  DeleteLoadedAcc() {
    this.ManagSvc.deleteAccountFromSessionStorage();
    this.ManagSvc.SelectedAcc = null;
    this.DataFilled = {
      FirstName: '',
      LastName: '',
      Email: new FormControl<string>('', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]),
      Password: '',
      Birthday: ''
    };
  }

}
