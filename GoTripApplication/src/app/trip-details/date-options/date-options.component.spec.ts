import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateOptionsComponent } from './date-options.component';

describe('DateOptionsComponent', () => {
  let component: DateOptionsComponent;
  let fixture: ComponentFixture<DateOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
