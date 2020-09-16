import { createApiFactory, createPlugin } from '@backstage/core';
import { TravisCIApi, travisCIApiRef } from './api';

export const plugin = createPlugin({
  id: 'travisci',
  apis: [createApiFactory(travisCIApiRef, new TravisCIApi())],
});
