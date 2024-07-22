import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagosPageRoutingModule } from './pagos-routing.module';

import { PagosPage } from './pagos.page';
import { SharedModule } from '../shared/shared.module';
import { TimestampToDatePipe } from '../services/timestamp-to-date.pipe';
import { DetallePagoComponent } from './detalle-pago/detalle-pago.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagosPageRoutingModule,
    SharedModule
     
  ],
  declarations: [PagosPage, DetallePagoComponent ]
})
export class PagosPageModule {}
