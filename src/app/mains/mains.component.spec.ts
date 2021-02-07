import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MainsComponent } from './mains.component';

describe('MainsComponent', () => {
  let component: MainsComponent;
  let fixture: ComponentFixture<MainsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MainsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
