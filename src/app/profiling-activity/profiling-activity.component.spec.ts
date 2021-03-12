import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilingActivityComponent } from './profiling-activity.component';

describe('ProfilingActivityComponent', () => {
  let component: ProfilingActivityComponent;
  let fixture: ComponentFixture<ProfilingActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilingActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilingActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
