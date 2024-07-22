import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagosPage } from './pagos.page';
import { DetallePagoComponent } from './detalle-pago/detalle-pago.component';

const routes: Routes = [
  {
    path: '',
    component: PagosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagosPageRoutingModule {}
