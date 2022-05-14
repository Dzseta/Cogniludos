import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';

import { OddOneOutRoutingModule } from './odd-one-out-routing.module';
import { OddOneOutComponent } from './odd-one-out.component';
import { ShapeComponent } from './shape/shape.component';
import { FormatTimePipeModule } from 'src/app/shared/format-time-pipe/format-time-pipe.module';


@NgModule({
  declarations: [
    OddOneOutComponent,
    ShapeComponent
  ],
  imports: [
    CommonModule,
    OddOneOutRoutingModule,
    MaterialModule,
    FormatTimePipeModule
  ]
})
export class OddOneOutModule { }
