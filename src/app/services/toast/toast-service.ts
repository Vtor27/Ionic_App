import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { alertCircleOutline, checkmarkCircleOutline, informationCircleOutline, warningOutline } from 'ionicons/icons';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastController: ToastController) {
    addIcons({
      checkmarkCircleOutline,
      alertCircleOutline,
      warningOutline,
      informationCircleOutline
    })
  }

  async succesToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
      color: 'success',
      icon: 'checkmark-circle-outline',
      cssClass: 'custom-toast'
    });
    await toast.present();
  }

  async errorToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
      color: 'danger',
      icon: 'alert-circle-outline',
      cssClass: 'custom-toast'
    });
    await toast.present();
  }

  async infoToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top', 
      color: 'warning',
      icon: 'information-circle-outline',
      cssClass: 'custom-toast'
    });
    await toast.present();
  }
}
