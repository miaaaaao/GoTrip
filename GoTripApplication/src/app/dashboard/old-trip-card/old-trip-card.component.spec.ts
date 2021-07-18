import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OldTripCardComponent } from './old-trip-card.component';

describe('OldTripCardComponent', () => {
  let component: OldTripCardComponent;
  let fixture: ComponentFixture<OldTripCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OldTripCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OldTripCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
