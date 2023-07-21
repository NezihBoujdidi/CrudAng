import { Injectable } from '@angular/core';

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


@Injectable({
  providedIn: 'root'
})
export class ManagementService {
  SelectedAcc: AccountWithImage | null = null;
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
