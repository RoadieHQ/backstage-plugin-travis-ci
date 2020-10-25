import {
  createApiFactory,
  createPlugin,
  discoveryApiRef,
} from '@backstage/core';
import { TravisCIApiClient, travisCIApiRef } from './api';

export const plugin = createPlugin({
  id: 'travisci',
  apis: [
    createApiFactory({
      api: travisCIApiRef,
      deps: { discoveryApi: discoveryApiRef },
      factory: ({ discoveryApi }) => new TravisCIApiClient({ discoveryApi }),
    }),
  ],
});
