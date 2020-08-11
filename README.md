# Travis CI Plugin for Backstage

![a list of builds in the Travis CI plugin for Backstage](./docs/travis-ci-plugin-1642x1027.png)

[https://travis-ci.com/](https://travis-ci.com/)

## Setup

1. If you have standalone app (you didn't clone this repo), then do

```bash
yarn add @roadiehq/backstage-plugin-travis-ci
```

3. Add plugin to the list of plugins:

```ts
// packages/app/src/plugins.ts
export { plugin as TravisCI } from '@roadiehq/backstage-plugin-travis-ci';
```

4. Add plugin API to your Backstage instance:

```ts
// packages/app/src/api.ts
import { TravisCIApi, travisCIApiRef } from '@roadiehq/backstage-plugin-travis-ci';

// ...

builder.add(travisCIApiRef, new TravisCIApi());
```

5. Run app with `yarn start` and navigate to `/travis-ci`

## Features

- List Travis CI Builds
- Retrigger builds

## Links

- [Backstage](https://backstage.io)
- [Further instructons](https://roadie.io/backstage/plugins/travis-ci/)
- Get hosted, managed Backstage for your company: https://roadie.io
