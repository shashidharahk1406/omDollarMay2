import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBidComponent } from './all-bid.component';

describe('AllBidComponent', () => {
  let component: AllBidComponent;
  let fixture: ComponentFixture<AllBidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllBidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllBidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
