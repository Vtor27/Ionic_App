import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  IonContent,
  IonGrid,
  IonCol,
  IonRow,
  IonCard,
  IonCardContent,
  IonText,
  IonImg,
} from '@ionic/angular/standalone';
import {
  CONFIGURACION_MOCK,
  GASTOS_MOCK,
  getTotalGastosFijos,
} from '../../mocks';
import { IMAGES } from 'src/app/constants/assetsRoutes';
import { ResumeStatus } from 'src/app/models/ResumeStatus';

@Component({
  selector: 'app-home',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss'],
  imports: [
    IonContent,
    IonGrid,
    IonCol,
    IonRow,
    IonCard,
    IonCardContent,
    IonText,
    IonImg,
    NgClass,
  ],
})
export class ResumeComponent implements OnInit {
  sueldo: number = 0;
  gastosFijos: number = 0;
  gastosVariables: number = 0;
  ahorroPrevisto: number = 0;
  presupuestoVariable: number = 0;
  disponible: number = 0;

  resumeStatus: ResumeStatus = {
    type: '',
    image: 'bien',
  };

  images = IMAGES;

  constructor() {}

  ngOnInit() {
    this.calcularResume();
  }

  calcularResume() {
    this.sueldo = CONFIGURACION_MOCK.sueldo_mensual;
    this.gastosFijos = getTotalGastosFijos();
    this.gastosVariables = GASTOS_MOCK.reduce((sum, g) => sum + g.cantidad, 0);

    this.ahorroPrevisto =
      (this.sueldo * CONFIGURACION_MOCK.porcentaje_ahorro) / 100;
    console.log('Ahorro Previsto: ', this.ahorroPrevisto);

    this.presupuestoVariable =
      this.sueldo - this.gastosFijos - this.ahorroPrevisto;
    console.log('Presupuesto variable: ', this.presupuestoVariable);

    this.disponible = this.presupuestoVariable - this.gastosVariables;
    console.log('Disponible: ', this.disponible);
  }

  getEstadoResume(): { type: string; image: string } {
    const porcentajeGastado = 60;
    // (this.gastosVariables / this.presupuestoVariable) * 100;
    // console.log('Porcentaje: ', porcentajeGastado);

    if (porcentajeGastado < 70) {
      return { type: 'status-bien', image: this.images.estados.bien };
    } else if (porcentajeGastado < 90) {
      return { type: 'status-justo', image: this.images.estados.justo };
    } else if (porcentajeGastado < 100) {
      return { type: 'status-muyJusto', image: this.images.estados.muyJusto };
    } else {
      return { type: 'status-pasado', image: this.images.estados.pasado };
    }
  }
}
