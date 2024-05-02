import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSupervisorComponent } from './edit-supervisor.component';

describe('EditSupervisorComponent', () => {
  let component: EditSupervisorComponent;
  let fixture: ComponentFixture<EditSupervisorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSupervisorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSupervisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
