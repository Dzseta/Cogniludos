import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { NgxEchartsModule } from 'ngx-echarts';

import { StatsRoutingModule } from './stats-routing.module';
import { StatsComponent } from './stats.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    StatsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StatsRoutingModule,
    MaterialModule,
    NgxEchartsModule.forRoot({ echarts: () => import('echarts') }),
  ]
})
export class StatsModule { }
