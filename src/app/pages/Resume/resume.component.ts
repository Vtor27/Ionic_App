import { NgClass, NgIf, NgFor, DecimalPipe } from '@angular/common';
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
  IonCardHeader,
  IonCardTitle,
  IonProgressBar,
  IonIcon,
} from '@ionic/angular/standalone';
import {
  CATEGORIAS_MOCK,
  CONFIGURACION_MOCK,
  GASTOS_MOCK,
  getTotalGastosFijos,
} from '../../mocks';
import { GastoCategoria } from 'src/app/models/gastoCategoria.interface';
import { IMAGES } from 'src/app/constants/assetsRoutes';
import { ResumeStatus } from 'src/app/models/ResumeStatus';
import { chevronDownOutline, chevronUpOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';


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
    IonCardHeader,
    IonCardTitle,
    IonProgressBar,
    NgClass,
    NgIf,
    NgFor,
    DecimalPipe,
    IonIcon,
  ],
})
export class ResumeComponent implements OnInit {
  sueldo: number = 0;
  gastosFijos: number = 0;
  gastosVariables: number = 0;
  ahorroPrevisto: number = 0;
  presupuestoVariable: number = 0;
  saldoDisponible: number = 0;
  saldoParaGastar: number = 0;

  //Variables para la previsión del mes según el gasto diario actual
  diasDelMes: number = 0;
  diaActual: number = 0;
  diasRestantes: number = 0;
  mediaDiaria: number = 0;
  previsionFinMes: number = 0;
  mediaNecesaria: number = 0;
  llegaObjetivo: boolean = true;

  desgloseDesplegado: boolean = false;
  categoriasDesplegado: boolean = false;

  gastosCategoria: GastoCategoria[] = [];


  images = IMAGES;

  resumeStatus: ResumeStatus = {
    type: '',
    image: this.images.estados.bien,
  };



  constructor() {
    addIcons({ chevronDownOutline, chevronUpOutline})
  }

  ngOnInit() {
    this.calcularResume();
    this.resumeStatus = this.getEstadoResume();
    this.calcularPrevision();
    this.calcularGastosPorCategoria();
  }

  calcularResume() {
    this.sueldo = CONFIGURACION_MOCK.sueldo_mensual;
    this.gastosFijos = getTotalGastosFijos();
    // this.gastosVariables = GASTOS_MOCK.reduce((sum, g) => sum + g.cantidad, 0);
    this.gastosVariables = 200;

    this.ahorroPrevisto =
      (this.sueldo * CONFIGURACION_MOCK.porcentaje_ahorro) / 100;
    console.log('Ahorro Previsto: ', this.ahorroPrevisto);

    this.presupuestoVariable =
      this.sueldo - this.gastosFijos - this.ahorroPrevisto;
    console.log('Presupuesto variable: ', this.presupuestoVariable);

    this.saldoDisponible = this.presupuestoVariable - this.gastosVariables;
    console.log('Disponible: ', this.saldoDisponible);
  }

  getEstadoResume(): { type: string; image: string } {
    const porcentajeGastado = (this.gastosVariables / this.presupuestoVariable) * 100;
    console.log('Porcentaje: ', porcentajeGastado);

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

  calcularSaldoDisponible() {
    const totalSaldoDisponible = this.presupuestoVariable;
    let saldoParaGastar = totalSaldoDisponible - this.gastosVariables;
    return saldoParaGastar;
  }

  getPorcentajeProgreso(): number {
    const porcentaje = (this.gastosVariables /this.presupuestoVariable) * 100;
    return Math.round(porcentaje);
  }

  calcularPrevision() {
    const fechaActual = new Date();

    this.diasDelMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth() + 1, 0).getDate();
    this.diaActual = fechaActual.getDate();
    this.diasRestantes = this.diasDelMes - this.diaActual;

    //Media del gasto diario hasta la fecha
    this.mediaDiaria = this.diaActual > 0 ? this.gastosVariables / this.diaActual : 0;

    //Que gastaré si sigo con ese ritmo...
    this.previsionFinMes = this.gastosVariables + (this.mediaDiaria * this.diasRestantes);

    //Llego al objetivo??
    this.llegaObjetivo = this.previsionFinMes <= this.presupuestoVariable;

    //Cuanto debería gastar para llegar al objetivo?
    const restante = this.presupuestoVariable - this.gastosVariables;
    this.mediaNecesaria = this.diasRestantes > 0 ? Math.max(restante / this.diasRestantes, 0) : 0;
  }

  toggleDesglose() {
    this.desgloseDesplegado = !this.desgloseDesplegado;
  }

  toggleCategorias() {
    this.categoriasDesplegado = !this.categoriasDesplegado;
  }

  calcularGastosPorCategoria() {
    const mapCategoria = new Map<number, number>();

    //Agrupar gastos por categoría
    GASTOS_MOCK.forEach((gasto) => {
      const actual = mapCategoria.get(gasto.categoria_id) || 0;
      mapCategoria.set(gasto.categoria_id, actual + gasto.cantidad);
    });

    //Convrtir a array con la info de los gastos por categoria
    this.gastosCategoria = Array.from(mapCategoria.entries()).map(([catId, total]) => {
      const categoria = CATEGORIAS_MOCK.find((c) => c.id === catId);
      return {
        nombre: categoria?.nombre || 'Otros',
        icono: categoria?.icono || 'ellipsis-horizontal',
        color: categoria?.color || '#222428',
        total: total,
        porcentaje: this.gastosVariables > 0 ? (total / this.gastosVariables) * 100 : 0,
      };
    }).sort((a, b) => b.total - a.total); //Esto ordena de mayor a menor
  }

}
