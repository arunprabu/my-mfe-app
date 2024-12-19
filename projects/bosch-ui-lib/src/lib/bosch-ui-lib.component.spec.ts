import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoschUiLibComponent } from './bosch-ui-lib.component';

describe('BoschUiLibComponent', () => {
  let component: BoschUiLibComponent;
  let fixture: ComponentFixture<BoschUiLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoschUiLibComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoschUiLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
