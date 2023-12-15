import { Route } from '@angular/router';
import { StandaloneComponent } from './pages/standalone/standalone.component';
import { SignalsComponent } from './pages/signals/signals.component';
import { DeferredviewsComponent } from './pages/deferredviews/deferredviews.component';
import { ControlflowComponent } from './pages/controlflow/controlflow.component';

export const appRoutes: Route[] = [
  {component: StandaloneComponent, path: 'standalone'},
  {component: SignalsComponent, path: 'signals'},
  {component: ControlflowComponent, path: 'controlflow'},
  {component: DeferredviewsComponent, path: 'deferredviews'}
];
