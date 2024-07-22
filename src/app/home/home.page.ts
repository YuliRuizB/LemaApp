import { Component, OnInit, inject } from '@angular/core';
import { UtilsService } from '../services/utils.service';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  firebaseData = inject(FirebaseService);
  utlsData = inject(UtilsService);  



  ngOnInit() {
  }
  singOut(){
    this.firebaseData.signOut();
  }

}
