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
import React from 'react';
import {
  Link,
  Theme,
  makeStyles,
  LinearProgress,
  Box,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import { InfoCard, StructuredMetadataTable } from '@backstage/core';
import ExternalLinkIcon from '@material-ui/icons/Launch';
import { useBuilds } from '../hooks/useBuilds';
import { getStatusComponent } from './BuildsPage/lib/CITable/CITable';
import moment from 'moment';

const useStyles = makeStyles<Theme>({
  externalLinkIcon: {
    fontSize: 'inherit',
    verticalAlign: 'bottom',
  },
});

const WidgetContent = ({
  loading,
  lastRun,
}: {
  loading?: boolean;
  lastRun: any;
}) => {
  const classes = useStyles();
  if (loading || !lastRun) return <LinearProgress />;

  return (
    <>
      <Box display="flex" alignItems="center">
        name:
        <Box mr={1} />
        <Typography>
          <Link href={lastRun.buildUrl} target="_blank">
            {lastRun.buildName}{' '}
            <ExternalLinkIcon className={classes.externalLinkIcon} />
          </Link>
        </Typography>
      </Box>
      <Box display="flex" alignItems="center">
        status:
        <Box mr={1} />
        {getStatusComponent(lastRun.status)}
        <Typography variant="button">{lastRun.status}</Typography>
      </Box>
      <Box display="flex" alignItems="center">
        Finished at:
        <Box mr={1} />
        <Typography>{moment(lastRun.finishedAt).fromNow()}</Typography>
      </Box>
      <Box display="flex" alignItems="center">
        Duration:
        <Box mr={1} />
        <Typography>{lastRun.duration}</Typography> sec
      </Box>
      <Box display="flex" alignItems="center">
        Branch:
        <Box mr={1} />
        <Typography>{lastRun.source.branchName}</Typography>
      </Box>
    </>
  );
};

export const LastBuildCard = () => {
  const [{ value, loading }] = useBuilds();
  return (
    <InfoCard title={`Latest Travis-CI Build`}>
      {value && value.length > 0 ? (
        <WidgetContent loading={loading} lastRun={value[0] ?? {}} />
      ) : (
        <CircularProgress />
      )}
    </InfoCard>
  );
};
