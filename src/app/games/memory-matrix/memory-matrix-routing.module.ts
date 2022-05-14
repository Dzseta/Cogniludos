import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemoryMatrixComponent } from './memory-matrix.component';

const routes: Routes = [
  { path: '', component: MemoryMatrixComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemoryMatrixRoutingModule { }
