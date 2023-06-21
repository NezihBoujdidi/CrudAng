import { TestBed } from '@angular/core/testing';

import { CredentialslistService } from './Credentials.service';

describe('CredentialslistService', () => {
  let service: CredentialslistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CredentialslistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
