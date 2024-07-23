import { Component, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { FirebaseService } from './services/firebase.service';
import { UtilsService } from './services/utils.service';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },   
    { title: 'Pagos', url: '/pagos', icon: 'cash' },
    { title: 'Noticias', url: '/noticias', icon: 'megaphone' },
    { title: 'Logros', url: '/logros', icon: 'ribbon' },
    { title: 'Configuración', url: '/configuracion', icon: 'build' }, 
  ];
  showMenu = false;
  firebaseData = inject(FirebaseService);
  utlsData = inject(UtilsService);

 constructor(private router: Router, private platform: Platform) {
    this.initializeApp(); 
  
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
       // console.log(event.url);
        //console.log( this.showMenu);
        if (event.url !== "/"){
        this.showMenu = event.url !== '/login';
      }
      //  console.log( this.showMenu);

      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Perform any higher level native operations if needed
    });
  }
  user():User {
    return this.utlsData.getFromLocalStorage('user');
  }

  singOut(){
    this.firebaseData.signOut();
  }
}