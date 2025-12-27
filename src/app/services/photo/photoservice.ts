import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ToastService } from '../toast/toast-service';
import { Directory } from '@capacitor/filesystem/dist/esm/definitions';
import { Filesystem } from '@capacitor/filesystem';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  constructor(private toastService: ToastService) {}

  async tomarFoto(): Promise<string | null> {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera,
      });

      if (image.base64String) {
        return image.base64String;
      }

      return null;
    } catch (error) {
      console.log('Error al tomar la foto:', error);
      this.toastService.errorToast('Error al tomar la foto.');
      return null;
    }
  }

  async guardarFoto(base64Data: string): Promise<string | null> {
    try {

      try{
        await Filesystem.mkdir({
          path: 'tickets',
          directory: Directory.Data,
          recursive: true,
        });
      } catch(error) {
        console.log('El directorio tickets ya existe.');
      }

      const fileName = `ticket_${new Date().getTime()}.jpg`;

      const savedFile = await Filesystem.writeFile({
        path: `tickets/${fileName}`,
        data: base64Data,
        directory: Directory.Data,
      });

      return `tickets/${fileName}`;
    } catch (error) {
      console.log('Error al guardar la foto:', error);
      this.toastService.errorToast('Error al guardar la foto.');
      return null;
    }
  }

  async eliminarFoto(path: string): Promise<void> {
    try {
      await Filesystem.deleteFile({
        path: path,
        directory: Directory.Data,
      });
    } catch (error) {
      console.log('Error al eliminar la foto:', error);
      this.toastService.errorToast('Error al eliminar la foto.');
    }
  }
}
