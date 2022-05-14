import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContinuumComponent } from './continuum.component';

describe('ContinuumComponent', () => {
  let component: ContinuumComponent;
  let fixture: ComponentFixture<ContinuumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContinuumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContinuumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
