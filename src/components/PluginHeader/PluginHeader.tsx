import React, { FC } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { ContentHeader, SupportButton } from '@backstage/core';
import { Button, IconButton, Box, Typography } from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';
import SettingsIcon from '@material-ui/icons/Settings';
import { useSettings } from '../../state';

export type Props = { title?: string };
export const PluginHeader: FC<Props> = ({ title = 'TravisCI' }) => {
  const [, { showSettings }] = useSettings();
  const location = useLocation();
  const notRoot = !location.pathname.match(/\/travisci\/?$/);
  const isSettingsPage = location.pathname.match(/\/travisci\/settings\/?/);
  return (
    <ContentHeader
      title={title}
      titleComponent={() => <Typography variant="h4">{title}</Typography>}
    >
      {!isSettingsPage && (
        <Button onClick={showSettings} startIcon={<SettingsIcon />}>
          Settings
        </Button>
      )}
      <SupportButton email="info@roadie.io" slackChannel="#roadie">
        This plugin allows you to view and interact with your builds within the
        Travis CI environment.
      </SupportButton>
    </ContentHeader>
  );
};
