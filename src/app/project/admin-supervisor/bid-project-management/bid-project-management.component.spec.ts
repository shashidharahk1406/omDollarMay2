import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BidProjectManagementComponent } from './bid-project-management.component';

describe('BidProjectManagementComponent', () => {
  let component: BidProjectManagementComponent;
  let fixture: ComponentFixture<BidProjectManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BidProjectManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BidProjectManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
