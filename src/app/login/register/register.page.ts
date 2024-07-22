import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UsersService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  showRegisterFields: boolean = false;
  usersService = inject(UsersService);
  firebaseSvc = inject(FirebaseService);
  utlsData = inject(UtilsService);

  form= new FormGroup ({
    uid: new FormControl(''),
    email: new FormControl('', [Validators.required , Validators.email]),   
    name: new FormControl('', [Validators.required]),
    customerId: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    secondLastName: new FormControl('', [Validators.required]),
    displayName: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    claveCliente: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
    active: new FormControl(true),
    address: new FormControl(''),
    city: new FormControl(''),
    zipCode: new FormControl(''),
    colony: new FormControl(''),
    photoUrl: new FormControl(''),
    state: new FormControl(''),
    emailVerified: new FormControl(''),
    refreshToken: new FormControl(''),
    related: new FormControl(''),
    streetNumber: new FormControl(''),
    dateOfBirth: new FormControl(''),
    verifyTerms: new FormControl('')
  })

  constructor(private navCtrl: NavController, private authService: AuthService) {}

  cargarData() {
    console.log('Clave Cliente:',  this.form.get('claveCliente')!.value!);  
    const email = this.form.get('email')!.value!;
    const clave = this.form.get('claveCliente')!.value!;  

    this.usersService.getUserInfo(clave, email).subscribe((data1: any[]) => {           
      console.log( data1);        
      if (data1.length > 0) {
        this.showRegisterFields = true;
        const userInfo = data1[0];
        this.form.get('name')?.setValue( userInfo.name); 
        this.form.get('lastName')?.setValue( userInfo.lastName); 
        this.form.get('secondLastName')?.setValue(userInfo.secondLastName); 
        this.form.get('displayName')?.setValue(userInfo.displayName); 
        this.form.get('phone')?.setValue(userInfo.phone); 
        this.form.get('uid')?.setValue(userInfo.uid); 
        this.form.get('active')?.setValue(userInfo.active);   

        this.form.get('address')?.setValue(userInfo.address);   
        this.form.get('city')?.setValue(userInfo.city);   
        this.form.get('zipCode')?.setValue(userInfo.zipCode);   
        this.form.get('colony')?.setValue(userInfo.colony);   
        this.form.get('photoUrl')?.setValue(userInfo.photoUrl);   
        this.form.get('state')?.setValue(userInfo.state);   
        this.form.get('emailVerified')?.setValue(userInfo.emailVerified);   

        this.form.get('phone')?.setValue(userInfo.phone);   
        this.form.get('refreshToken')?.setValue(userInfo.refreshToken);   
        this.form.get('dateOfBirth')?.setValue(userInfo.dateOfBirth);   
        this.form.get('verifyTerms')?.setValue(userInfo.verifyTerms);   
        this.form.get('state')?.setValue(userInfo.state);   
        this.form.get('streetNumber')?.setValue(userInfo.streetNumber);   
        this.form.get('related')?.setValue(userInfo.related);                  

      } else {
        alert('No existe el usuario, favor de validar la información.');
      }
    });   
   
  }

  async register() {
    const password = this.form.get('password')!.value!;  
    const confirmPassword = this.form.get('confirmPassword')!.value!;  
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
      console.log(this.form.value);
      if (this.form.valid){
        const loading = await this.utlsData.loading();
        await loading.present();

        console.log("form valid");
        this.firebaseSvc.createAuth(this.form.value as User).then(res => {
          //console.log("res");
         // console.log(res);
          const uid = this.form.get('uid')!.value!;  
          this.authService.register(uid, this.form.value);
          this.utlsData.presentToast({
            message: "Actualización exitosa. Inicia Sessión",
            duration: 2000,
            color:'primary',
            position: 'middle',
            icon:"bulb-outline"
          });
          this.navCtrl.navigateRoot('/login'); // Navigate to the login page after successful registration      
       
        }).catch(error => {
          this.utlsData.presentToast({
            message: error.message,
            duration: 2000,
            color:'primary',
            position: 'middle',
            icon: 'alert-circle-outline'
          });
        }).finally(() => {
          loading.dismiss();
        })         
        
      }
      } catch (error: any) {
      alert('Error en el registro: ' + error.message);
    }
  }
}