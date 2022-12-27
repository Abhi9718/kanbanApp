import { TestBed } from '@angular/core/testing';

import { UserauthenicationService } from './userauthenication.service';

describe('UserauthenicationService', () => {
  let service: UserauthenicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserauthenicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
