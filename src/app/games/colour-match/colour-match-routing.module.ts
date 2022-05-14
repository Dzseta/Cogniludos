import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColourMatchComponent } from './colour-match.component';

const routes: Routes = [
  { path: '', component: ColourMatchComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ColourMatchRoutingModule { }
