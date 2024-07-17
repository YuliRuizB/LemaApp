import { EmailValidator } from "@angular/forms";

export interface User {
    active:boolean;
    apellidoMaterno:string;
    apellidoPaterno:string;
    calle:string;
    city:string;
    claveCliente:string;
    codigoPostal:string;
    colonia:string;
    displayName:string;
    email:string;
    emailverified:string;
    estado:string;
    fechaNacimiento :Date;
    municipio:string;
    name:string;
    numero:string;
    parentesco:string;
    parentesco2:string;
    parentesco3:string;
    phone:string;
    phone2:string;
    phone3:string;
    photoUrl:string;
    photoUrlInfo:string;
    uid: string;
}