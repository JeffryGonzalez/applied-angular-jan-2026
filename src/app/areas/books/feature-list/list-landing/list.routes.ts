import { Routes } from '@angular/router';
import { Home } from './internal/home';
import { HomePage } from './internal/pages/home';
import { PreferencesPage } from './internal/pages/preferences';


export const listFeatureRoutes: Routes = [
  {
    path: '',
    providers: [],
    component: Home,
    children: [
      {
        path: '',
        component: HomePage
      },
      {
        path: 'preferences',
        component: PreferencesPage,
      }
    ]
  },
];
