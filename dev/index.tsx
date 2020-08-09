import { createDevApp } from '@backstage/dev-utils';
import { plugin } from '../src/plugin';
import { travisCIApiRef, TravisCIApi } from '../src/api';

createDevApp()
  .registerPlugin(plugin)
  .registerApiFactory({
    deps: {},
    factory: () => new TravisCIApi(),
    implements: travisCIApiRef,
  })
  .render();
