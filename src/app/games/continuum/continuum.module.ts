import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';

import { ContinuumRoutingModule } from './continuum-routing.module';
import { ContinuumComponent } from './continuum.component';
import { DragDropModule } from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [
    ContinuumComponent
  ],
  imports: [
    CommonModule,
    ContinuumRoutingModule,
    MaterialModule,
    DragDropModule
  ]
})
export class ContinuumModule { }
