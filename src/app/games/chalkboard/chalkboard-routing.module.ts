import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChalkboardComponent } from './chalkboard.component'

const routes: Routes = [
  { path: '', component: ChalkboardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChalkboardRoutingModule { }
