import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSupervisorComponent } from './admin-supervisor.component';

describe('AdminSupervisorComponent', () => {
  let component: AdminSupervisorComponent;
  let fixture: ComponentFixture<AdminSupervisorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSupervisorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSupervisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
