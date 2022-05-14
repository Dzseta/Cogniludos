import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OddOneOutComponent } from './odd-one-out.component';

const routes: Routes = [
  { path: '', component: OddOneOutComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OddOneOutRoutingModule { }
