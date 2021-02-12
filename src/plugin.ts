import {
  createApiFactory,
  createComponentExtension,
  createPlugin,
  createRoutableExtension,
  createRouteRef,
  discoveryApiRef,
} from '@backstage/core';
import { TravisCIApiClient, travisCIApiRef } from './api';

export const entityContentRouteRef = createRouteRef({
  title: 'travisCI',
});

export const travisciPlugin = createPlugin({
  id: 'travisci',
  apis: [
    createApiFactory({
      api: travisCIApiRef,
      deps: { discoveryApi: discoveryApiRef },
      factory: ({ discoveryApi }) => new TravisCIApiClient({ discoveryApi }),
    }),
  ],
  routes: {
    entityContent: entityContentRouteRef,
  },
});

export const EntityTravisCIContent = travisciPlugin.provide(
  createRoutableExtension({
    component: () => import('./Router').then(m => m.Router),
    mountPoint: entityContentRouteRef,
  }),
);

export const EntityTravisCIOverviewCard = travisciPlugin.provide(
  createComponentExtension({
    component: {
      lazy: () =>
        import('./components/LastBuildCard').then(m => m.LastBuildCard),
    },
  }),
);
