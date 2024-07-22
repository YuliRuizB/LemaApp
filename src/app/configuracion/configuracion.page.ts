import { Component, OnInit, inject } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { UtilsService } from '../services/utils.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage implements OnInit {
  firebaseData = inject(FirebaseService);
  utlsData = inject(UtilsService);
  dataUser = localStorage.getItem('user');
  form= new FormGroup ({
    customerId: new FormControl('', [Validators.required]),  
    lastName: new FormControl('', [Validators.required]),
    secondLastName: new FormControl('', [Validators.required]),
    street: new FormControl('', [Validators.required]),
    zipCode: new FormControl('', [Validators.required]),
    colony: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    dateOfBirth: new FormControl('', [Validators.required]),
    related: new FormControl('', [Validators.required]),
    streetNumber: new FormControl('', [Validators.required]),
    displayName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    
  })
  
  constructor() {
    console.log(this.dataUser);
   }

  ngOnInit() {
  }

  async takeImage(){
    const dataUrl = (await this.utlsData.takePicture('Cambiar mi Foto')).dataUrl;
    let avatar = dataUrl;
  }

}
