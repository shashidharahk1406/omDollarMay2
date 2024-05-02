import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllStatusComponent } from './all-status.component';

describe('AllStatusComponent', () => {
  let component: AllStatusComponent;
  let fixture: ComponentFixture<AllStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
