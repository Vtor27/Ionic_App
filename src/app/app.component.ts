import { DatabaseService } from './services/database/database-service';
import { Component } from '@angular/core';
import {
  IonApp,
  IonRouterOutlet,
  IonMenu,
  IonContent,
} from '@ionic/angular/standalone';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { TabBarComponent } from './components/tab-bar/tab-bar.component';
import { HeadBarComponent } from './components/head-bar/head-bar.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [
    IonApp,
    IonRouterOutlet,
    SideMenuComponent,
    TabBarComponent,
    HeadBarComponent,
    TabBarComponent,
  ],
})
export class AppComponent {
  constructor(private databaseService: DatabaseService) {
    this.initApp();
  }

  async initApp() {
    await this.databaseService.initializeDatabase();
  }
}
