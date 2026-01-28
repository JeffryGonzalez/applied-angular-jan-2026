import { Routes } from '@angular/router';
import { Home } from './internal/home';
import { HomePage } from './internal/pages/home';
import { ComponentsPage } from './internal/pages/components';
import { SignalsOnePage } from './internal/pages/signals-one';
import { ComputingPage } from './internal/pages/computing';
import { EffectingPage } from './internal/pages/effecting';
import { LinkedSignalsPage } from './internal/pages/linked-signals';
import { ServicesPage } from './internal/pages/services';
import { FormExamplePage } from '@ht/dev/demos-aa-landing/internal/pages/form-example';

export const demosAaFeatureRoutes: Routes = [
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
        path: 'components',
        component: ComponentsPage,
      },
      {
        path: 'signals-one',
        component: SignalsOnePage,
      },
      {
        path: 'computing',
        component: ComputingPage,
      },
      {
        path: 'effects',
        component: EffectingPage,
      },
      {
        path: 'linked-signals',
        component: LinkedSignalsPage,
      },
      {
        path: 'services',
        component: ServicesPage,
      },
      {
        path: 'form',
        component: FormExamplePage,
      },
    ],
  },
];
