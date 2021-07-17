import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveTripCardComponent } from './active-trip-card.component';

describe('ActiveTripCardComponent', () => {
  let component: ActiveTripCardComponent;
  let fixture: ComponentFixture<ActiveTripCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveTripCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveTripCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
