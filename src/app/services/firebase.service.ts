import { Injectable, inject } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { User } from "../models/user.model";
import {
    createUserWithEmailAndPassword,
    getAuth, signInWithEmailAndPassword, updateProfile, sendPasswordResetEmail
} from 'firebase/auth';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { getFirestore,addDoc,setDoc, getDoc, doc , 
    collectionData , deleteDoc, query} from '@angular/fire/firestore';
import { UtilsService } from "./utils.service";
import { collection, updateDoc } from "firebase/firestore";

import { deleteObject, uploadString, ref ,getDownloadURL, getStorage } from 'firebase/storage'
@Injectable({
    providedIn: 'root'
})

export class FirebaseService {
    auth = inject(AngularFireAuth);
    firestore = inject(AngularFirestore);
    utlsData = inject(UtilsService);
 
    
    getAut(){
        return getAuth();
    }

    singIn(user: User) {
      //  console.log(user.email);
       // console.log(user.password);
        return signInWithEmailAndPassword(getAuth(), user.email, user.password);
    }

    createAuth(user: User) {
      //  console.log(user.email);
       // console.log(user.password);
        const currentUser = getAuth().currentUser;
       // console.log(currentUser);
        return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
    }

    updateUser(displayName: string) {
        const currentUser = getAuth().currentUser;
        if (currentUser) {
            return updateProfile(currentUser, { displayName })
        } else {
            return Promise.reject('No user is currently logged in.');
        }
    }

    sendRecoveryEmail(email: string) {
        return sendPasswordResetEmail(getAuth(), email);
    }

    setDocument(path: string, data: any) {
        return setDoc(doc(getFirestore(), path), data);
    }


    updateDocument(path: string, data: any) {
        return updateDoc(doc(getFirestore(), path), data);
    }

    deleteDocument(path: string) {
        return deleteDoc(doc(getFirestore(), path));
    }

    deleteObject(path:string) {
        return deleteObject(ref(getStorage(),path));
    }

    async getDocument(path: string ) {
        return (await getDoc(doc(getFirestore(), path))).data();
    }

// 'users/id/subcollection'
    addDocument(path: string = 'users', data: any) {
        return addDoc(collection(getFirestore(), path), data);
    }

    getCollectionData(path :string, collectionQuery? : any ) {
        const ref =collection(getFirestore(), path)
        return collectionData(query ( ref, collectionQuery),{ idField: 'uid'});
    }

    signOut() {
        getAuth().signOut();
        localStorage.removeItem('user');
        this.utlsData.routerLink('/login');
    }

   
}

