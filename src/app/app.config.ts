import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withExperimentalAutoCleanupInjectors,
} from '@angular/router';

import { provideHttpClient } from '@angular/common/http';
import { icons } from '@ht/shared/ui-common/icons/types';
import { authStore } from '@ht/shared/util-auth/store';
import { provideIcons } from '@ng-icons/core';
import { routes } from './app.routes';
export const appConfig: ApplicationConfig = {
  // are global providers for the entire application.
  // UNLESS someone somewhere adds a provider for it, then they get their own instance.
  providers: [
    provideHttpClient(/*your jwt auth and all that*/),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding(), withExperimentalAutoCleanupInjectors()),
    authStore,
    provideIcons(icons),
  ],
};
