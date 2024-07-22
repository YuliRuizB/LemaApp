import { EmailValidator } from "@angular/forms";

export interface User {
    active:boolean;
    address:string;    
    city?:string;
    colony:string;
    customerId:string;
    dateOfBirth:string;   
    displayName?:string;
    email:string;
    emailverified?:string;
    id?:string;
    lastName:string;
    name:string;
    password:string;
    occupation:string;
    phone?:string;
    phone2?:string;
    phone3?:string;
    photoUrl?:string;
    refreshToken?:string;
    related:string;
    secondLastName:string;
    street:string;
    verifyTerms:string;
    streetNumber:string;    
    uid: string;
    userName:string;
    zipCode:string;
}