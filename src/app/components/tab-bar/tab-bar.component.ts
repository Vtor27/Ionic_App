import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline, cardOutline, calendarOutline } from 'ionicons/icons';
import { ICONS } from 'src/app/constants/assetsRoutes';

@Component({
  selector: 'app-tab-bar',
  templateUrl: './tab-bar.component.html',
  styleUrls: ['./tab-bar.component.scss'],
  imports: [IonTabBar, IonTabButton, IonLabel, IonIcon],
})
export class TabBarComponent implements OnInit {
  icons = ICONS;
  constructor(
    private router: Router
  ) {
    addIcons({ homeOutline, cardOutline, calendarOutline });
  }

  ngOnInit() {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
