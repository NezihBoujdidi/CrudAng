import { TestBed } from '@angular/core/testing';

import { AccountsListService } from './accounts-list.service';

describe('AccountsListService', () => {
  let service: AccountsListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountsListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
