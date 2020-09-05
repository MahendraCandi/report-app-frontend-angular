import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FallbackReportComponent } from './fallback-report.component';

describe('FallbackReportComponent', () => {
  let component: FallbackReportComponent;
  let fixture: ComponentFixture<FallbackReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FallbackReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FallbackReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
