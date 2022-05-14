import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';

import { HelpRoutingModule } from './help-routing.module';
import { HelpComponent } from './help.component';


@NgModule({
  declarations: [
    HelpComponent
  ],
  imports: [
    CommonModule,
    HelpRoutingModule,
    MaterialModule
  ]
})
export class HelpModule { }
