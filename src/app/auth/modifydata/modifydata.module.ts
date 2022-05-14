import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import { ModifydataRoutingModule } from './modifydata-routing.module';
import { ModifydataComponent } from './modifydata.component';


@NgModule({
  declarations: [
    ModifydataComponent
  ],
  imports: [
    CommonModule,
    ModifydataRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({ positionClass: 'inline' }),
  ]
})
export class ModifydataModule { }
