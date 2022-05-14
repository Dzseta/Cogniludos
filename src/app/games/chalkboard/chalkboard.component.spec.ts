import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChalkboardComponent } from './chalkboard.component';

describe('ChalkboardComponent', () => {
  let component: ChalkboardComponent;
  let fixture: ComponentFixture<ChalkboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChalkboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChalkboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
