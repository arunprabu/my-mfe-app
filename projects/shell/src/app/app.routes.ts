import { Routes } from '@angular/router';
// TO LOAD REMOTE MODULES
import { loadRemoteModule } from '@angular-architects/native-federation';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'todos',
    loadComponent: () =>
      loadRemoteModule('todos', './Component').then((m) => m.AppComponent),
  },
  {
    path: 'users',
    loadComponent: () =>
      loadRemoteModule('users', './Component').then((m) => m.AppComponent),
  },
  {
    path: '**',
    component: HomeComponent,
  },
];
