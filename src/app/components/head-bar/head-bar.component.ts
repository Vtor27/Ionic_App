import { DatePipe, TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonButtons,
  IonToolbar,
  IonIcon,
  IonTitle,
  IonButton,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { menuOutline } from 'ionicons/icons';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-head-bar',
  templateUrl: './head-bar.component.html',
  styleUrls: ['./head-bar.component.scss'],
  imports: [
    IonHeader,
    IonButtons,
    IonButton,
    IonIcon,
    IonToolbar,
    IonTitle,
    DatePipe,
    TitleCasePipe,
    IonButton,
  ],
})
export class HeadBarComponent implements OnInit {
  private dateTitle: string = '';

  constructor(private menuService: MenuService) {
    addIcons({
      menuOutline,
    });
  }

  ngOnInit() {}

  get getDateTitle() {
    return (this.dateTitle = Date());
  }

  openMenu() {
    this.menuService.open();
  }
}
