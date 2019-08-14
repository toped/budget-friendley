import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeSummaryTableComponent } from './income-summary-table.component';

describe('IncomeSummaryTableComponent', () => {
  let component: IncomeSummaryTableComponent;
  let fixture: ComponentFixture<IncomeSummaryTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomeSummaryTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeSummaryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
