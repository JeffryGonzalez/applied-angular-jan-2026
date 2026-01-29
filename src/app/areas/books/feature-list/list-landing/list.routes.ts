import { Routes } from '@angular/router';
import { Home } from './internal/home';
import { HomePage } from './internal/pages/home';
import { PrefsPage } from './internal/pages/prefs';

export const listFeatureRoutes: Routes = [
  {
    path: '',
    providers: [],
    component: Home,
    children: [
      {
        path: '',
        component: HomePage,
      },
      {
        path: 'prefs',
        component: PrefsPage,
      },
    ],
  },
];
