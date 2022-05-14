import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeedMatchComponent } from './speed-match.component';

describe('SpeedMatchComponent', () => {
  let component: SpeedMatchComponent;
  let fixture: ComponentFixture<SpeedMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeedMatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeedMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
