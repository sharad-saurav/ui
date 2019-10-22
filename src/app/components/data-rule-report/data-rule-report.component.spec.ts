import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataRuleReportComponent } from './data-rule-report.component';

describe('DataRuleReportComponent', () => {
  let component: DataRuleReportComponent;
  let fixture: ComponentFixture<DataRuleReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataRuleReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataRuleReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
