import React, { FC } from 'react';
import { createRouteRef } from '@backstage/core';
import { SvgIcon, SvgIconProps } from '@material-ui/core';

const TravisCIIcon: FC<SvgIconProps> = props => (
  <SvgIcon
    {...props}
    enableBackground="new 0 0 200 200"
    viewBox="0 0 103.8 105.2"
  >
    <path
      d="m38.6 52.6c0-6.9 5.6-12.5 12.5-12.5s12.5 5.6 12.5 12.5-5.6 12.5-12.5 12.5c-6.9.1-12.5-5.6-12.5-12.5zm12.5-52.6c-24.6 0-45.2 16.8-51 39.6 0 .2-.1.3-.1.5 0 1.4 1.1 2.5 2.5 2.5h21.2c1 0 1.9-.6 2.3-1.5 4.4-9.5 13.9-16.1 25.1-16.1 15.2 0 27.6 12.4 27.6 27.6s-12.4 27.6-27.6 27.6c-11.1 0-20.7-6.6-25.1-16.1-.4-.9-1.3-1.5-2.3-1.5h-21.2c-1.4 0-2.5 1.1-2.5 2.5 0 .2 0 .3.1.5 5.8 22.8 26.4 39.6 51 39.6 29.1 0 52.7-23.6 52.7-52.7 0-29-23.6-52.5-52.7-52.5z"
      fill="#343434"
    />
  </SvgIcon>
);

export const travisCIRouteRef = createRouteRef({
  icon: TravisCIIcon,
  path: '/travis-ci/*',
  title: 'TravisCI',
});
