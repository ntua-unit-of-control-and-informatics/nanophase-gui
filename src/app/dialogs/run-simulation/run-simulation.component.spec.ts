import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RunSimulationComponent } from './run-simulation.component';

describe('RunSimulationComponent', () => {
  let component: RunSimulationComponent;
  let fixture: ComponentFixture<RunSimulationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RunSimulationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RunSimulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
