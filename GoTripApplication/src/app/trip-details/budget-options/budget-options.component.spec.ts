import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetOptionsComponent } from './budget-options.component';

describe('BudgetOptionsComponent', () => {
  let component: BudgetOptionsComponent;
  let fixture: ComponentFixture<BudgetOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
