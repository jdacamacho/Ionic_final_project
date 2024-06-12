import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./Products/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'products/save',
    loadComponent: () => import('./Products/form-save/form-save.component').then((m) => m.FormSaveComponent),
  },
  {
    path: 'products/update',
    loadComponent: () => import('./Products/form-update/form-update.component').then((m) => m.FormUpdateComponent),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

