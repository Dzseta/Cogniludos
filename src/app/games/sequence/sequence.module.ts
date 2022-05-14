import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';

import { SequenceRoutingModule } from './sequence-routing.module';
import { SequenceComponent } from './sequence.component';
import { DragDropModule } from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [
    SequenceComponent
  ],
  imports: [
    CommonModule,
    SequenceRoutingModule,
    MaterialModule,
    DragDropModule
  ]
})
export class SequenceModule { }
