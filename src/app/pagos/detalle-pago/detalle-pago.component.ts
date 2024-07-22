import { Component, Input, OnInit } from '@angular/core';
import { payments } from 'src/app/models/payments.model';

@Component({
  selector: 'app-detalle-pago',
  templateUrl: './detalle-pago.component.html',
  styleUrls: ['./detalle-pago.component.scss'],
})
export class DetallePagoComponent  implements OnInit {

  @Input() payment: payments | undefined;

  constructor() { }

  ngOnInit() {}

  submit(){
    if(this.payment)  console.log(this.payment);
         
  }
}


