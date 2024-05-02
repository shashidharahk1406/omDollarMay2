import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBidderComponent } from './view-bidder.component';

describe('ViewBidderComponent', () => {
  let component: ViewBidderComponent;
  let fixture: ComponentFixture<ViewBidderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewBidderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBidderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
