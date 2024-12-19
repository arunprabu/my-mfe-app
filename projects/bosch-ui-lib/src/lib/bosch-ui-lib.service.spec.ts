import { TestBed } from '@angular/core/testing';

import { BoschUiLibService } from './bosch-ui-lib.service';

describe('BoschUiLibService', () => {
  let service: BoschUiLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoschUiLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
