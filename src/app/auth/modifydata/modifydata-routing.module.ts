import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModifydataComponent } from './modifydata.component';

const routes: Routes = [
  { path: '', component: ModifydataComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModifydataRoutingModule { }
