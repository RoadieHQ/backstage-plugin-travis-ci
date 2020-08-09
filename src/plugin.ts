import { createPlugin } from '@backstage/core';
import { App } from './components/App';
import { travisCIRouteRef } from './route-refs';

export const plugin = createPlugin({
  id: 'travisci',
  register({ router }) {
    router.addRoute(travisCIRouteRef, App, { exact: false });
  },
});
