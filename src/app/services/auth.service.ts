import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import * as moment from 'moment';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: firebase.User | null = null;
  userState: BehaviorSubject<any> = new BehaviorSubject([]);

  
  constructor(private auth: AngularFireAuth, private afs: AngularFirestore,    
    private router: Router) {   
   
  }

  async login(email: string, password: string) {
    try {
      await this.auth.signInWithEmailAndPassword(email, password);
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Login error', error);
    }
  }

  async logout() {
    try {
      await this.auth.signOut();
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Logout error', error);
    }
  }
  getUser() {
    return this.auth.authState;
  }

  getUserFromDB() {
    return this.userState;
  }

  signout() {
    return this.auth.signOut();
  }
  forgotPassword(email: string) {
    return this.auth.sendPasswordResetEmail(email);
  }

  sendPasswordResetEmail(email: string) {
    return this.auth.sendPasswordResetEmail(email);
  }

  resendVerificationEmail() {
    if (this.user) {
    return this.user.sendEmailVerification();
    }  else 
    { return []}
  }


  register(user:any) { 

  }
  
  setUserData(user : any, result : any) {
    console.log(user);
    console.log(result);
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${result.uid}`);
    const userData = {
      uid: result.uid,
      email: result.email,
      active:user.active,
      displayName: `${user.firstName} ${user.lastName}`,
      apellidoMaterno: user.apellidoMaterno,
      apellidoPaterno: user.apellidoPaterno,
      name: user.name,
      calle:user.calle,
      city: user.city,
      codigoPostal:user.codigoPostal,
      colonia:user.colonia,
      photoUrl: user.photoUrl || "",
      estado:user.estado,
      emailVerified: result.emailVerified,          
      phone: user.phone,
      refreshToken: '',    
      fechaNacimiento:user.fechaNacimiento,           
      claveCliente: user.claveCliente,   
      terms: user.verifyTerms,		
			status: 'completo',
      municipio: user.municipio,
      numero:user.numero,
      parestesco:user.parentesco,
			dateCreateUserFormat: moment().format('l'),
			dateCreateUserFull: moment().format()		
    }

    return userRef.set(userData, {merge: true});    
  }



}