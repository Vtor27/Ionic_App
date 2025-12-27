import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'resume',
    loadComponent: () =>
      import('./pages/Resume/resume.component').then((m) => m.ResumeComponent),
  },
  {
    path: 'nuevo-gasto',
    loadComponent: () => 
      import('./pages/nuevo-gasto/nuevo-gasto.component').then((m) => m.NuevoGastoComponent),
  },{
    path: 'historial',
    loadComponent: () => 
      import('./pages/historial/historial.component').then((m) => m.HistorialComponent),
  },
  {
    path: '',
    redirectTo: 'resume',
    pathMatch: 'full',
  },
];
