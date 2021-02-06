import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSimulationComponent } from './show-simulation.component';

describe('ShowSimulationComponent', () => {
  let component: ShowSimulationComponent;
  let fixture: ComponentFixture<ShowSimulationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowSimulationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSimulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
