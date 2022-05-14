import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';

import { ColourMatchRoutingModule } from './colour-match-routing.module';
import { ColourMatchComponent } from './colour-match.component';
import { FormatTimePipeModule } from 'src/app/shared/format-time-pipe/format-time-pipe.module';

@NgModule({
  declarations: [
    ColourMatchComponent
  ],
  imports: [
    CommonModule,
    ColourMatchRoutingModule,
    MaterialModule,
    FormatTimePipeModule
  ]
})
export class ColourMatchModule { }
