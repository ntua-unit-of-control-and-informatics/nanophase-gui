import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EmissionComponent } from './emission.component';

describe('EmissionComponent', () => {
  let component: EmissionComponent;
  let fixture: ComponentFixture<EmissionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
