import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CredentialslistService {
  Credentials : string[][]=[['nezih123','0123'],['wassim95','5555']]
  
  constructor() { }

  getCredentialslist(): string[][] {
    return this.Credentials;
  }
  
}
