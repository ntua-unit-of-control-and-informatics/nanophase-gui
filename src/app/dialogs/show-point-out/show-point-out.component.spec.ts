import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPointOutComponent } from './show-point-out.component';

describe('ShowPointOutComponent', () => {
  let component: ShowPointOutComponent;
  let fixture: ComponentFixture<ShowPointOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowPointOutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPointOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
