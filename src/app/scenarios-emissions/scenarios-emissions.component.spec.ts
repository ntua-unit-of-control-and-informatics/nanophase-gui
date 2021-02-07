import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ScenariosEmissionsComponent } from './scenarios-emissions.component';

describe('ScenariosEmissionsComponent', () => {
  let component: ScenariosEmissionsComponent;
  let fixture: ComponentFixture<ScenariosEmissionsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ScenariosEmissionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScenariosEmissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
