import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SataskDetailsComponent } from './satask-details.component';

describe('SataskDetailsComponent', () => {
  let component: SataskDetailsComponent;
  let fixture: ComponentFixture<SataskDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SataskDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SataskDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
