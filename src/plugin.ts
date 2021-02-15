import {
  createApiFactory,
  createPlugin,
  discoveryApiRef,
  identityApiRef,
} from '@backstage/core';
import { TravisCIApiClient, travisCIApiRef } from './api';

export const plugin = createPlugin({
  id: 'travisci',
  apis: [
    createApiFactory({
      api: travisCIApiRef,
      deps: { discoveryApi: discoveryApiRef, identityApi: identityApiRef },
      factory: ({ discoveryApi, identityApi }) => new TravisCIApiClient({ discoveryApi, identityApi }),
    }),
  ],
});
