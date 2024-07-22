import { Component, OnInit, inject } from '@angular/core';
import { UtilsService } from '../services/utils.service';
import { FirebaseService } from '../services/firebase.service';
import { User } from 'firebase/auth';
import { payments } from '../models/payments.model';
import { Timestamp } from 'firebase/firestore';
import { DetallePagoComponent } from './detalle-pago/detalle-pago.component';
import * as moment from 'moment';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.page.html',
  styleUrls: ['./pagos.page.scss'],
})
export class PagosPage implements OnInit {
  firebaseData = inject(FirebaseService);
  utlsData = inject(UtilsService);
 pagos: payments[] = [];
 loading: boolean = false;
  
  constructor() { 
   
  }

  ngOnInit() {
  }

  users(): User {
    return this.utlsData.getFromLocalStorage('user');
  }

  ionViewWillEnter(){ // se ejecuta cada que entran a  la pagina
    console.log("entro");
    
   this.getPayments();
  }

  formatTimestamp(timestamp: Timestamp | Date): string {
    let date: Date;

    if (timestamp instanceof Timestamp) {
      date = timestamp.toDate();
    } else {
      date = timestamp as Date; // Suponemos que es un Date ya
    }

    return moment(date).format('DD/MM/YYYY');
  }


  getPayments() {

    //  let path = `students/${this.users().uid}/payments`;
    let path = `students/b5aScrf5swvvJgg7HPW7/payments`;
    console.log(this.users().uid);
    
     let sub =  this.firebaseData.getCollectionData(path).subscribe({
        next: (res: any ) => {
          console.log(res);
          this.pagos = res;
          sub.unsubscribe();
        }
      })    

  }

  onClickView(p:payments){
    // view with a model
    this.utlsData.presentModal({
      component: DetallePagoComponent,
      cssClass:'add-update-modal',
      componentProps: { p }
    })
  }

}
