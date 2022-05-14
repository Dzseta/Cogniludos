import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpeedMatchComponent } from './speed-match.component';

const routes: Routes = [
  { path: '', component: SpeedMatchComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpeedMatchRoutingModule { }
