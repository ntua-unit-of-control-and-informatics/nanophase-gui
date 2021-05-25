import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultilineD3Component } from './multiline-d3.component';

describe('MultilineD3Component', () => {
  let component: MultilineD3Component;
  let fixture: ComponentFixture<MultilineD3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultilineD3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultilineD3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
