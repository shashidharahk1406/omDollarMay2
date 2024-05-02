import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRewardComponent } from './view-reward.component';

describe('ViewRewardComponent', () => {
  let component: ViewRewardComponent;
  let fixture: ComponentFixture<ViewRewardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRewardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRewardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
