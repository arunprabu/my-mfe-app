import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiComponentLibComponent } from './ui-component-lib.component';

describe('UiComponentLibComponent', () => {
  let component: UiComponentLibComponent;
  let fixture: ComponentFixture<UiComponentLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiComponentLibComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiComponentLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
