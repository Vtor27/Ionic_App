import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  // BehaviorSubject mantiene el último valor y lo emite a nuevos suscriptores
  private menuOpen = new BehaviorSubject<boolean>(false);

  // Exponemos el observable para que los componentes puedan suscribirse
  menuOpen$ = this.menuOpen.asObservable();

  open() {
    this.menuOpen.next(true);
  }

  close() {
    this.menuOpen.next(false);
  }

  toggle() {
    this.menuOpen.next(!this.menuOpen.value);
  }
}
