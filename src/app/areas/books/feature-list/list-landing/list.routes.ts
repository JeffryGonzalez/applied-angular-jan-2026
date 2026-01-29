import { Routes } from '@angular/router';
import { Home } from './internal/home';
import { HomePage } from './internal/pages/home';
import { Stats } from '../stats';
import { List } from '../list';

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
        path: 'list',
        component: List,
      },
      {
        path: 'stats',
        component: Stats,
      },
    ],
  },
];
