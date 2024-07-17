import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogrosPage } from './logros.page';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: LogrosPage
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogrosPageRoutingModule {}
