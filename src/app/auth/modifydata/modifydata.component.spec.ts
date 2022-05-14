import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifydataComponent } from './modifydata.component';

describe('ModifydataComponent', () => {
  let component: ModifydataComponent;
  let fixture: ComponentFixture<ModifydataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifydataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifydataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
