import { configApiRef, createApiFactory, createPlugin } from '@backstage/core';
import { TravisCIApi, travisCIApiRef } from './api';

export const plugin = createPlugin({
  id: 'travisci',
  apis: [
    createApiFactory({
      api: travisCIApiRef,
      deps: { configApi: configApiRef },
      factory: ({ configApi }) =>
        new TravisCIApi(`${configApi.getString('backend.baseUrl')}`),
    }),
  ],
});
