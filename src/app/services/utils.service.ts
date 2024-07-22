import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, AlertOptions, LoadingController, ModalController, ModalOptions, ToastController, ToastOptions } from '@ionic/angular';
import { Camera, CameraResultType , CameraSource} from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  loadingCtrl = inject(LoadingController);
  toastCtrl = inject(ToastController);
  router = inject(Router);
  modalData = inject(ModalController);
  alertCtrl = inject(AlertController);

  loading() {
    return this.loadingCtrl.create({ spinner: 'crescent' })
  }

  async presentToast(opts?: ToastOptions) {
    const toast = await this.toastCtrl.create(opts);
    toast.present();
  }

  routerLink(url: string) {
    return this.router.navigateByUrl(url);
  }

  saveInLocalStorage(key:string, value:any) {
    return localStorage.setItem(key, JSON.stringify(value));
  }

  getFromLocalStorage(key:string){
    const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
  }

  async presentModal(opts: ModalOptions){
        
    const modal= await this.modalData.create(opts);
    await modal.present();

    const {data} = await modal.onWillDismiss();
    if(data) return data;
  }

  dismissModal(data?:any) {
      return this.modalData.dismiss(data);
  }



  async takePicture(promptLabelHeader:string) {
    return await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt,
      promptLabelHeader,
      promptLabelPhoto: "Selecciona una imagen",
      promptLabelPicture: "Toma una foto"
    });
  
   /*  // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    var imageUrl = image.webPath;
  
    // Can be set to the src of an image now
    imageElement.src = imageUrl; */
  };

  async presentAlert(opts : AlertOptions){
    const alert = this.alertCtrl.create(opts);
    (await alert).present();
  }

}
