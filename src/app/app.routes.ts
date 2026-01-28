import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./areas/home/feature-landing/landing.routes').then((r) => r.homeLandingFeatureRoutes),
  },
  {
    path: 'dev',
    loadChildren: () =>
      import('./areas/dev/feature-landing/landing.routes').then((r) => r.devLandingFeatureRoutes),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./areas/profile/feature-landing/landing.routes').then(
        (r) => r.profileLandingFeatureRoutes,
      ),
  },
  {
    path: 'demos',
    loadChildren: () =>
      import('./areas/dev/demos-aa-landing/demos-aa.routes').then((r) => r.demosAaFeatureRoutes),
  },
  {
    path: 'links',
    loadChildren: () =>
      import('./areas/links/feature-landing/landing.routes').then((r) => r.linksFeature),
  },
  {
    path: 'counting',
    loadChildren: () =>
      import('./areas/demos/counting-landing/counting-landing/counting.routes').then(
        (r) => r.countingFeatureRoutes,
      ),
  },

  {
    path: 'lab1',
    loadChildren: () =>
      import('./areas/labs/lab1/lab1-landing/lab1.routes').then((r) => r.lab1Routes),
  },
  {
    path: 'tasks',
    loadChildren: () =>
      import('./areas/tasks/feature-list/list-landing/list.routes').then(
        (r) => r.listFeatureRoutes,
      ),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
