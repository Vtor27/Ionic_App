import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonText,
  IonIcon,
  IonButton,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  chevronBackOutline, 
  chevronForwardOutline,
  fastFoodOutline,
  carOutline,
  gameControllerOutline,
  medkitOutline,
  ellipsisHorizontalOutline,
} from 'ionicons/icons';
import { GastoConCategoria } from 'src/app/models/gastoConCategoria.interface';
import { CATEGORIAS_MOCK, GASTOS_MOCK } from 'src/app/mocks';

@Component({
  selector: 'app-shistorial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss'],
  imports: [
    CommonModule,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardContent,
    IonText,
    IonIcon,
    IonButton,
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
  ],
})
export class HistorialComponent implements OnInit {

  //Calendario
  diasSemana: string[] = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
  diasMes: (number | null)[] = [];
  mesActual: number = new Date().getMonth();
  anioActual: number = new Date().getFullYear();
  diaSeleccionado: number | null = null;

  //Gastos
  todosLosGastos: GastoConCategoria[] = [];
  gastosDelDia: GastoConCategoria[] = [];

  //Modal
  mostrarModal = false;
  gastoSeleccionado: GastoConCategoria | null = null;

  constructor() { 
    addIcons({
      chevronBackOutline,
      chevronForwardOutline,
      fastFoodOutline,
      carOutline,
      gameControllerOutline,
      medkitOutline,
      ellipsisHorizontalOutline
    });
  }

  ngOnInit() {
    this.cargarGastos();
    this.generarCalendario();
    this.seleccionarDia(new Date().getDate());
  }

  get mesActualTexto(): string {
    const meses = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    return `${meses[this.mesActual]} ${this.anioActual}`;
  }

  cargarGastos() {
    this.todosLosGastos = GASTOS_MOCK.map(gasto => {
      const categoria = CATEGORIAS_MOCK.find(cat => cat.id === gasto.categoria_id);
      return {
        ...gasto,
        id: gasto.id || 0,
        categoria_nombre: categoria?.nombre || 'Otros',
        categoria_color: categoria?.color || '#222428',
        categoria_icono: categoria?.icono || 'ellipsis-horizontal-outline',
      };
    });
  }

  generarCalendario() {
    const primerDia = new Date(this.anioActual, this.mesActual, 1);
    const ultimoDia = new Date(this.anioActual, this.mesActual + 1, 0);

    //La semana empezará en lunes
    let diaSemanaInicio = primerDia.getDay() - 1;
    if(diaSemanaInicio < 0) diaSemanaInicio = 6;

    this.diasMes = [];

    for(let i = 0; i < diaSemanaInicio; i++) {
        this.diasMes.push(null);
      }
    
      for(let i = 1; i <= ultimoDia.getDate(); i++) {
        this.diasMes.push(i);
      }
  }

  mesAnterior() {
    if(this.mesActual === 0) {
      this.mesActual = 11;
      this.anioActual--;
    } else {
      this.mesActual--;
    }
    this.generarCalendario();
    this.diaSeleccionado = null;
    this.gastosDelDia = [];
  }

  mesSiguiente() {
    if(this.mesActual === 11) {
      this.mesActual = 0;
      this.anioActual++;
    } else {
      this.mesActual++;
    }
    this.generarCalendario();
    this.diaSeleccionado = null;
    this.gastosDelDia = [];
  }

  seleccionarDia(dia: number | null) {
    this.diaSeleccionado = dia;
    this.filtrarGastosDelDia();
  }

  filtrarGastosDelDia() {
    if(!this.diaSeleccionado) {
      this.gastosDelDia = [];
      return;
    }

    this.gastosDelDia = this.todosLosGastos.filter(gasto => {
      const fechaGasto = new Date(gasto.fecha_gasto);
      return (
        fechaGasto.getDate() === this.diaSeleccionado &&
        fechaGasto.getMonth() === this.mesActual &&
        fechaGasto.getFullYear() === this.anioActual
    );
    });
  }

  tieneGastos(dia: number): boolean {
    return this.todosLosGastos.some(gasto => {
      const fechaGasto = new Date(gasto.fecha_gasto);
      return(
        fechaGasto.getDate() === dia &&
        fechaGasto.getMonth() === this.mesActual &&
        fechaGasto.getFullYear() === this.anioActual
      );
    });
  }

  abrirDetalleGasto(gasto: GastoConCategoria) {
    this.gastoSeleccionado = gasto;
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.gastoSeleccionado = null;
  }
}
