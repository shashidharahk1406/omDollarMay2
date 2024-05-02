import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllRateCardComponent } from './all-rate-card.component';

describe('AllRateCardComponent', () => {
  let component: AllRateCardComponent;
  let fixture: ComponentFixture<AllRateCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllRateCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllRateCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
