import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColourMatchComponent } from './colour-match.component';

describe('ColourMatchComponent', () => {
  let component: ColourMatchComponent;
  let fixture: ComponentFixture<ColourMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColourMatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColourMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
