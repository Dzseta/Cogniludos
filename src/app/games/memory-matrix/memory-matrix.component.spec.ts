import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoryMatrixComponent } from './memory-matrix.component';

describe('MemoryMatrixComponent', () => {
  let component: MemoryMatrixComponent;
  let fixture: ComponentFixture<MemoryMatrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemoryMatrixComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemoryMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
