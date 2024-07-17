import { Component, inject } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  name: string = "";  
  apellidoPaterno: string = "";
  apellidoMaterno: string = "";
  displayName: string = "";
  phone: string = "";
  email: string = "";
  clave: string = "";
  password: string= "";  
  confirmPassword: string = "";
  showRegisterFields: boolean = false;
  usersService = inject(UsersService);

  constructor(private navCtrl: NavController, private authService: AuthService) {}

  cargarData() {
    console.log('Clave Cliente:', this.clave);
    console.log('Correo:', this.email);

    this.usersService.getUserInfo(this.clave,this.email).subscribe((data1: any[]) => {           
      console.log( data1);        
      if (data1.length > 0) {
        this.showRegisterFields = true;
        const userInfo = data1[0];
        this.name = userInfo.name;
        this.apellidoPaterno = userInfo.apellidoPaterno;
        this.apellidoMaterno = userInfo.apellidoMaterno;
        this.displayName = userInfo.displayName;
        this.phone = userInfo.phone;

      } else {
        alert('No existe el usuario, favor de validar la información.');
      }
    });   
   
  }

  async register() {
    if (this.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
      let data: any = {
        email:this.email,
        password: this.password,
        name: this.name
      }
      await this.authService.register(data);
      alert('Registro exitoso');
      this.navCtrl.navigateRoot('/login'); // Navigate to the login page after successful registration
    } catch (error: any) {
      alert('Error en el registro: ' + error.message);
    }
  }
}