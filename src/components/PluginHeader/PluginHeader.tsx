/*
 * Copyright 2020 Spotify AB
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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
      titleComponent={() => (
        <Box alignItems="center" display="flex">
          {notRoot && (
            <IconButton component={RouterLink} to="/travisci">
              <ArrowBack />
            </IconButton>
          )}
          <Typography variant="h4">{title}</Typography>
        </Box>
      )}
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
