import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {
  resetPasswordForm: FormGroup;
  loading = false;
  
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    public navController: NavController
  ) {

      this.resetPasswordForm = this.fb.group({
        email: ['', Validators.compose([Validators.required, Validators.email])]
      });   
  }   

  ngOnInit() {
  
  }

  sendPasswordResetEmail() {
   /*  if(this.resetPasswordForm.valid) {
      const data = this.resetPasswordForm.value;
      this.authService.forgotPassword(data.email).then((response: any) => {
        console.log(response);
        this.toastService.presentToast('Te hemos enviado a tu cuenta de correo electrónico las instrucciones para recuperar tu contraseña.', 3000, 'success').then( () => {
          setTimeout(() => {
            this.navController.navigateBack('/login');
          }, 3000);
        })
      })
      .catch( (err: any) => this.toastService.presentToast(err, 3000, 'danger'))
    } */
  }

  gotoSignin() {
    this.navController.pop();
  }

}
