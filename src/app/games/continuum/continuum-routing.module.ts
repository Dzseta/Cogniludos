import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContinuumComponent } from './continuum.component'

const routes: Routes = [
  { path: '', component: ContinuumComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContinuumRoutingModule { }
