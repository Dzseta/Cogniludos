import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';

import { SpeedMatchRoutingModule } from './speed-match-routing.module';
import { SpeedMatchComponent } from './speed-match.component';
import { FormatTimePipeModule } from 'src/app/shared/format-time-pipe/format-time-pipe.module';


@NgModule({
  declarations: [
    SpeedMatchComponent
  ],
  imports: [
    CommonModule,
    SpeedMatchRoutingModule,
    MaterialModule,
    FormatTimePipeModule
  ]
})
export class SpeedMatchModule { }
