import { TestBed } from '@angular/core/testing';

import { UiComponentLibService } from './ui-component-lib.service';

describe('UiComponentLibService', () => {
  let service: UiComponentLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UiComponentLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
