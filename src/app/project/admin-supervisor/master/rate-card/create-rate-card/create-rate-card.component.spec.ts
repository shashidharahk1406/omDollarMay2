import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRateCardComponent } from './create-rate-card.component';

describe('CreateRateCardComponent', () => {
  let component: CreateRateCardComponent;
  let fixture: ComponentFixture<CreateRateCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRateCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRateCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
