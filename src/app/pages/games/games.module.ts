import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';

import { GamesRoutingModule } from './games-routing.module';
import { GamesComponent } from './games.component';


@NgModule({
  declarations: [
    GamesComponent
  ],
  imports: [
    CommonModule,
    GamesRoutingModule,
    MaterialModule
  ]
})
export class GamesModule { }
