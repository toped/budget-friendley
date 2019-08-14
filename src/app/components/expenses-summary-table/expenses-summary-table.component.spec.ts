import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesSummaryTableComponent } from './expenses-summary-table.component';

describe('ExpensesSummaryTableComponent', () => {
  let component: ExpensesSummaryTableComponent;
  let fixture: ComponentFixture<ExpensesSummaryTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpensesSummaryTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesSummaryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
