import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginComponent {

  form= new FormGroup ({
    email: new FormControl('', [Validators.required , Validators.email]),
    password: new FormControl('', [Validators.required]),
  })

  constructor(private authService: AuthService,
    private navCtrl: NavController
  ) {}

  login() {
   // console.log(this.form.value);
   if (this.form.valid) {
    const email = this.form.get('email')!.value!;
    const password = this.form.get('password')!.value!;
    this.authService.login(email, password);
  }
  }
  navigateToRegister() {
    this.navCtrl.navigateForward('/register');
  }
}