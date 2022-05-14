import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SequenceComponent } from './sequence.component';

const routes: Routes = [
  { path: '', component: SequenceComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SequenceRoutingModule { }
