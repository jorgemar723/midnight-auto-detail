import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';
import { routes } from './app.routes';

export default {
  providers: [
    provideRouter(routes, withEnabledBlockingInitialNavigation())
  ]
};
