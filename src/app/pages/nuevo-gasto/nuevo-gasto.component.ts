import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonText,
  IonInput,
  IonButton,
  IonDatetime,
  IonDatetimeButton,
  IonModal,
  IonIcon,
  IonSelectOption,
  IonSelect,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { calendarOutline, cameraOutline, trashOutline } from 'ionicons/icons';
import { CATEGORIAS_MOCK } from 'src/app/mocks';
import { PhotoService } from 'src/app/services/photo/photoservice';
import { ToastService } from 'src/app/services/toast/toast-service';

@Component({
  selector: 'app-nuevo-gasto',
  templateUrl: './nuevo-gasto.component.html',
  styleUrls: ['./nuevo-gasto.component.scss'],
  imports: [
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonText,
    IonInput,
    IonDatetime,
    IonDatetimeButton,
    IonModal,
    IonButton,
    IonIcon,
    IonSelect,
    IonSelectOption,
    FormsModule,
    NgFor,
    NgIf
  ],
})
export class NuevoGastoComponent implements OnInit {
  cantidad: number | null = null;

  fechaSeleccionada: string = new Date().toISOString();

  categoriaSeleccionada: number | null = null;
  categorias = CATEGORIAS_MOCK.filter((c) => c.es_fijo === 0);

  descripcion: string = '';

  fotoBase64: string | null = null;
  fotoPreview: string | null = null;

  constructor(
    private toastService: ToastService,
    private alertController: AlertController,
    private photoService: PhotoService
  ) {
    addIcons({ calendarOutline, cameraOutline, trashOutline });
  }

  ngOnInit() {}

  onFechaInputChange(event: any) {
    this.fechaSeleccionada = event.detail.value;
  }

  onFechaCalendarChange(event: any) {
    this.fechaSeleccionada = event.detail.value.split('T')[0];
  }

  async cancelar() {
    this.limpiarFormulario();
  }

  limpiarFormulario() {
    this.cantidad = null;
    this.fechaSeleccionada = new Date().toISOString();
    this.categoriaSeleccionada = null;
    this.descripcion = '';
  }

  async guardarGasto() {

    if(!this.cantidad || this.cantidad <= 0){
      this.toastService.infoToast('Itroduce una cantidad.');
      return;
    }

    if(!this.categoriaSeleccionada) {
      this.toastService.infoToast('Selecciona una categoría');
      return;
    }

    let rutaFoto: string | null = null;
    if(this.fotoBase64){
      rutaFoto = await this.photoService.guardarFoto(this.fotoBase64);
    }

    console.log({
      cantidad: this.cantidad,
      fecha: this.fechaSeleccionada,
      categoria: this.categoriaSeleccionada,
      descripcion: this.descripcion,
      fotoTicket: rutaFoto,
    });

    this.toastService.succesToast('Gasto añadido correctamente.');
    this.limpiarFormulario();
  }

  async tomarFoto() {
    const base64 = await this.photoService.tomarFoto();
    if(base64) {
      this.fotoBase64 = base64;
      this.fotoPreview = `data:image/jpg;base64,${base64}`;
    }
  }

  eliminarFoto() {
    this.fotoBase64 = null;
    this.fotoPreview = null;
  }
}
