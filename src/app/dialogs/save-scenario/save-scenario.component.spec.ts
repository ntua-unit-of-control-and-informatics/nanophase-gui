import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SaveScenarioComponent } from './save-scenario.component';

describe('SaveScenarioComponent', () => {
  let component: SaveScenarioComponent;
  let fixture: ComponentFixture<SaveScenarioComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveScenarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveScenarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
