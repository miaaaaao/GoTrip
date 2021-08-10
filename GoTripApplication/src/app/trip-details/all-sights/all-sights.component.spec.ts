import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSightsComponent } from './all-sights.component';

describe('AllSightsComponent', () => {
  let component: AllSightsComponent;
  let fixture: ComponentFixture<AllSightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllSightsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllSightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
