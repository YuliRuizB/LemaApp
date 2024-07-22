import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';
import { User } from '../models/user.model';
import { UtilsService } from '../services/utils.service';
import { UsersService } from '../services/user.service';
import { map } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginComponent {
  firebaseData = inject(FirebaseService);
  utlsData = inject(UtilsService);
  usersService = inject(UsersService);
  
  form= new FormGroup ({
    customerId: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required , Validators.email]),
    password: new FormControl('', [Validators.required]),
  })

  constructor(private authService: AuthService,
    private navCtrl: NavController
  ) {}

  async login() {
    // console.log(this.form.value);
    if (this.form.valid) {     
      // this.authService.login(email, password);
      const loading = await this.utlsData.loading();
      await loading.present();
      
    
      const email = this.form.get('email')!.value!;
      const password = this.form.get('password')!.value!;
      const customerId = this.form.get('customerId')!.value!;

      this.firebaseData.singIn(this.form.value as User).then(res => {
     //   console.log(res.user.uid);            
        
      
        this.usersService.getUser(res.user.uid).subscribe((docSnapshot: any) => {
          if (docSnapshot.payload.exists) {
            const id = docSnapshot.payload.id;
            const data = docSnapshot.payload.data() as User;
            const userData = { id, ...data };
            //console.log(userData);
        
            let uid = res.user.uid;
            this.form.controls.customerId.setValue(customerId);
            this.utlsData.saveInLocalStorage('user', userData);
            this.utlsData.routerLink('/home');
            this.form.reset();

            this.utlsData.presentToast({
              message: `Te damos la bienvenida ${userData.displayName}`,
              duration: 1500,              
              color: 'primary',
              position: 'middle',
              icon: 'person-circle-outline'
            });

          } else {
            this.utlsData.presentToast({
              message: "No existe un registro con esa información, favor de validar",
              duration: 2000,
              color: 'primary',
              position: 'middle',
              icon: 'alert-circle-outline'
            });
            loading.dismiss();
          }
        }, error => {
          console.error('Error fetching user data:', error);
        });

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
  }

  async setUserInfo(uid: string) {
    // console.log(this.form.value);
    if (this.form.valid) {     
      // this.authService.login(email, password);
      const loading = await this.utlsData.loading();
      await loading.present();
      
      const email = this.form.get('email')!.value!;
      const password = this.form.get('password')!.value!;

      let path = `users/${uid}`
      delete  this.form.value.password;

      this.firebaseData.setDocument(path, this.form.value).then(res => {
        console.log(res);
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
  }

  navigateToRegister() {
    this.navCtrl.navigateForward('/register');
  }
}