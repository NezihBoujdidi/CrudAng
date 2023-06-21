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
export class ManagementService {
  SelectedAcc: Account | null = null;
  private readonly storageKey = 'account';

  constructor() { 
    this.loadSelectedAccountFromSessionStorage();
  }
  
  loadSelectedAccountFromSessionStorage() {
    const storedAccount = sessionStorage.getItem(this.storageKey);
    if (storedAccount) {
      this.SelectedAcc = JSON.parse(storedAccount);
    }
  }

  saveSelectedAccountToSessionStorage() {
    sessionStorage.setItem(this.storageKey, JSON.stringify(this.SelectedAcc));
  }

  deleteAccountFromSessionStorage() {
    sessionStorage.removeItem(this.storageKey);
  }

}
