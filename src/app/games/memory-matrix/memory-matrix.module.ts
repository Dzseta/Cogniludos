import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';

import { MemoryMatrixRoutingModule } from './memory-matrix-routing.module';
import { MemoryMatrixComponent } from './memory-matrix.component';
import { TileComponent } from './tile/tile.component';


@NgModule({
  declarations: [
    MemoryMatrixComponent,
    TileComponent
  ],
  imports: [
    CommonModule,
    MemoryMatrixRoutingModule,
    MaterialModule
  ]
})
export class MemoryMatrixModule { }
