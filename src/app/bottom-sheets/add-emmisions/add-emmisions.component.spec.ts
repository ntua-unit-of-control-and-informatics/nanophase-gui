import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddEmmisionsComponent } from './add-emmisions.component';

describe('AddEmmisionsComponent', () => {
  let component: AddEmmisionsComponent;
  let fixture: ComponentFixture<AddEmmisionsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEmmisionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmmisionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
