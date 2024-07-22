import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, UntypedFormGroup, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {
  form= new FormGroup ({
    email: new FormControl('', [Validators.required , Validators.email])
  
  })
  loading = false;
  firebaseData = inject(FirebaseService);
  utlsData = inject(UtilsService);
  
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    public navController: NavController
  ) {

     
  }   

  ngOnInit() {
  
  }

  sendPasswordResetEmail() {
    if(this.form.valid) {
      const email = this.form.get('email')!.value!;

     this.firebaseData.sendRecoveryEmail(email).then(res => {
                
      this.utlsData.presentToast({
        message: `Correo enviado con éxito`,
        duration: 1500,              
        color: 'primary',
        position: 'middle',
        icon: 'mail-outline'
      });

      this.utlsData.routerLink('/login');
      this.form.reset();
      
     })
     .catch( (err: any) => 
      this.utlsData.presentToast({
        message: err.message,
        duration: 1500,              
        color: 'primary',
        position: 'middle',
        icon: 'alert-circle-outline'
      }));   
    } 
  }

  gotoSignin() {
    this.navController.pop();
  }

}
