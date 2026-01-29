import { Routes } from '@angular/router';
import { Home } from './internal/home';
import { BooksPage } from './internal/pages/books';

export const listFeatureRoutes: Routes = [
  {
    path: '',
    providers: [],
    component: Home,
    children: [
      {
        path: '',
        component: BooksPage,
        // children: [
        //   {
        //     path: '/books',
        //     component: ListComponent,
        //   },
        //   {
        //     path: '/stats',
        //     component: StatsComponent,
        //   },
        // ],
      },
    ],
  },
];
