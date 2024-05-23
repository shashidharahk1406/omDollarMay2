import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortingConfigModalComponent } from './sorting-config-modal.component';

describe('SortingConfigModalComponent', () => {
  let component: SortingConfigModalComponent;
  let fixture: ComponentFixture<SortingConfigModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortingConfigModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SortingConfigModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
