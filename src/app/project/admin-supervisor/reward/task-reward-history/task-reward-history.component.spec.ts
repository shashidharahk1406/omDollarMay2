import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskRewardHistoryComponent } from './task-reward-history.component';

describe('TaskRewardHistoryComponent', () => {
  let component: TaskRewardHistoryComponent;
  let fixture: ComponentFixture<TaskRewardHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskRewardHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskRewardHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
