import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'save',
    loadComponent: () => import('./form-save/form-save.component').then((m) => m.FormSaveComponent),
  },
  {
    path: 'update',
    loadComponent: () => import('./form-update/form-update.component').then((m) => m.FormUpdateComponent),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

