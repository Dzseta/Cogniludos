import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OddOneOutComponent } from './odd-one-out.component';

describe('OddOneOutComponent', () => {
  let component: OddOneOutComponent;
  let fixture: ComponentFixture<OddOneOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OddOneOutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OddOneOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
