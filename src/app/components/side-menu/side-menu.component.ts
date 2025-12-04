import { MenuService } from './../../services/menu.service';
import { Component, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import {
  personOutline,
  settingsOutline,
  helpCircleOutline,
  logOutOutline,
  closeOutline,
} from 'ionicons/icons';
import {
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonButton,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  imports: [CommonModule, IonList, IonItem, IonIcon, IonLabel, IonButton],
})
export class SideMenuComponent implements OnInit {
  isOpen$ = this.menuService.menuOpen$;

  constructor(private menuService: MenuService) {
    addIcons({
      personOutline,
      settingsOutline,
      helpCircleOutline,
      logOutOutline,
      closeOutline,
    });
  }

  ngOnInit() {}

  close() {
    this.menuService.close();
  }
}
