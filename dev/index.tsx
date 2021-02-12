import { createDevApp } from '@backstage/dev-utils';
import { travisciPlugin } from '../src/plugin';

createDevApp().registerPlugin(travisciPlugin).render();
