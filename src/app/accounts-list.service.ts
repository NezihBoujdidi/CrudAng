import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

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


export class AccountsListService {

  
  Accounts: Account[] = [];
  private readonly storageKey = 'accountList';
  
  constructor(private http: HttpClient) {}

  getAccounts(): Observable<any>{
    return this.http.get("http://localhost:8888/api/v1/account");
  }

  getAccountData(): Account[] {
    return this.Accounts;
  }

  CreateAccount(ide : null |number,FN: string, LN: string, email: any, Pass: string, birthday: string, imageId : number) : Observable<any> {
    const newAccount: AccountWithImage = {
      id : ide,
      firstName: FN,
      lastName: LN,
      email: email,
      password: Pass,
      dob: birthday,
      imageId: imageId
    };

    return this.http.post("http://localhost:8888/api/v1/account/saveAcc",newAccount);
  }

  EditAccount(acc: AccountWithImage): Observable<any>{
    return this.http.put(`http://localhost:8888/api/v1/account/${acc.id}`,acc);
  }

  deleteAccount(id : null|number): Observable<any>{
    return this.http.delete(`http://localhost:8888/api/v1/account/${id}`);
  }


  getImage(id : number):Observable<Blob>{
    return this.http.get(`http://localhost:8888/api/v1/account/getImage/${id}`,{ responseType: 'blob' });
  }

  deleteImage(id : number): Observable<any> {
    return this.http.delete(`http://localhost:8888/api/v1/account/deleteImage/${id}`)
  }


}