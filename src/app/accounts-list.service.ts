import { Injectable } from '@angular/core';

interface Account {
  FirstName: string;
  LastName: string;
  Email: any;
  Password: string;
  Birthday: string;
}

@Injectable({
  providedIn: 'root'
})


export class AccountsListService {
  Accounts: Account[] = [];
  private readonly storageKey = 'accountList';
  constructor() {
    this.Accounts = [
      { FirstName: 'Alexandre', LastName: 'Bommarito', Email: 'druzyka@tlbreaksm.com', Password: '@NNHje)', Birthday: '1995-12-05' },
      { FirstName: 'Brent', LastName: 'Disalvo', Email: 'tjones9114@indonesiaberseri.com', Password: 'ZX8McKI4', Birthday: '1975-08-29' },
      { FirstName: 'Valentino', LastName: 'Marple', Email: 'kev101@lomaschool.org', Password: '9A^AAXH8', Birthday: '2000-01-13' },
      { FirstName: 'Beverlee', LastName: 'Gallucci', Email: 'daybad@betmelli20.com', Password: 'CmcRKcLR', Birthday: '1992-04-29' },
      { FirstName: 'Pernell', LastName: 'Huang', Email: 'mickey936@raanank.com', Password: 'LUS84hg9', Birthday: '1998-07-05' },
      { FirstName: 'Sandor', LastName: 'Schachter', Email: 'hienlinhpc@jdiwop.com', Password: 'fJGw@wM4', Birthday: '1987-03-16' }
    ];
    this.loadAccountsFromSessionStorage();
  }

  getAccountData(): Account[] {
    return this.Accounts;
  }

  addAccount(acc: Account) {
    this.Accounts.push(acc);
  }

  CreateAccount(FN: string, LN: string, email: any, Pass: string, birthday: string) {
    const newAccount: Account = {
      FirstName: FN,
      LastName: LN,
      Email: email,
      Password: Pass,
      Birthday: birthday,
    };

    this.addAccount(newAccount);
  }

  EditAccount(FN: string, LN: string, email: any, Pass: string, birthday: string,index: number){
    this.Accounts[index].FirstName=FN;
    this.Accounts[index].LastName=LN;
    this.Accounts[index].Email=email;
    this.Accounts[index].Password=Pass;
    this.Accounts[index].Birthday=birthday;
  }

  loadAccountsFromSessionStorage() {
    const storedAccounts = sessionStorage.getItem(this.storageKey);
    if (storedAccounts) {
      this.Accounts = JSON.parse(storedAccounts);
    }
  }

  saveAccountsToSessionStorage() {
    sessionStorage.setItem(this.storageKey, JSON.stringify(this.Accounts));
  }


}


