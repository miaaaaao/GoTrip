import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewTripPlanButtonComponent } from './create-new-trip-plan-button.component';

describe('CreateNewTripPlanButtonComponent', () => {
  let component: CreateNewTripPlanButtonComponent;
  let fixture: ComponentFixture<CreateNewTripPlanButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewTripPlanButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewTripPlanButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
