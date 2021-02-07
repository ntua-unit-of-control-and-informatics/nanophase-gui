import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SimulationsEmissionsComponent } from './simulations-emissions.component';

describe('SimulationsEmissionsComponent', () => {
  let component: SimulationsEmissionsComponent;
  let fixture: ComponentFixture<SimulationsEmissionsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SimulationsEmissionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulationsEmissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
