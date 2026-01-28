import { Routes } from '@angular/router';
import { Home } from './internal/home';
import { HomePage } from './internal/pages/home';
import { RecordPage } from './internal/pages/record';
import { tasksStore } from './stores/tasks';

export const listFeatureRoutes: Routes = [
  {
    path: '',
    providers: [tasksStore],
    component: Home,
    children: [
      {
        path: '',
        component: HomePage,
      },
      {
        path: 'recorder',
        component: RecordPage,
      },
    ],
  },
];
