import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';

import { ChalkboardRoutingModule } from './chalkboard-routing.module';
import { ChalkboardComponent } from './chalkboard.component';
import { FormatTimePipeModule } from 'src/app/shared/format-time-pipe/format-time-pipe.module';

@NgModule({
  declarations: [
    ChalkboardComponent
  ],
  imports: [
    CommonModule,
    ChalkboardRoutingModule,
    MaterialModule,
    FormatTimePipeModule
  ]
})
export class ChalkboardModule { }
