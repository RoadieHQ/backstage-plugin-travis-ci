import React, { FC } from 'react';
import { Typography, Box, IconButton } from '@material-ui/core';
import RetryIcon from '@material-ui/icons/Replay';
import {
  StatusError,
  StatusWarning,
  StatusOK,
  StatusPending,
  StatusRunning,
  Table,
  TableColumn,
} from '@backstage/core';
import formatDistance from 'date-fns/formatDistance';

export type CITableBuildInfo = {
  id: string;
  buildName: string;
  buildUrl?: string;
  finishedAt: string;
  duration: number;
  source: {
    branchName: string;
    commit: {
      hash: string;
      url: string;
    };
  };
  status: string;
  tests?: {
    total: number;
    passed: number;
    skipped: number;
    failed: number;
    testUrl: string;
  };
  onRestartClick: () => void;
};

const getStatusComponent = (status: string | undefined = '') => {
  switch (status.toLowerCase()) {
    case 'queued':
    case 'created':
      return <StatusPending />;
    case 'started':
      return <StatusRunning />;
    case 'failed':
      return <StatusError />;
    case 'passed':
      return <StatusOK />;
    case 'canceled':
    default:
      return <StatusWarning />;
  }
};

const generatedColumns: TableColumn[] = [
  {
    title: 'ID',
    field: 'id',
    type: 'numeric',
    width: '80px',
  },
  {
    title: 'Build',
    field: 'buildName',
    highlight: true,
    render: (row: Partial<CITableBuildInfo>) => (
      <a href={row.buildUrl} target="_blank" rel="noopener noreferrer">
        {row.buildName}
      </a>
    ),
    sorting: false,
  },
  {
    title: 'Source',
    render: (row: Partial<CITableBuildInfo>) => (
      <>
        <p>{row.source?.branchName}</p>
        <p>{row.source?.commit.hash}</p>
      </>
    ),
    sorting: false,
  },
  {
    title: 'Status',
    render: (row: Partial<CITableBuildInfo>) => (
      <Box display="flex" alignItems="center">
        {getStatusComponent(row.status)}
        <Box mr={1} />
        <Typography variant="button">{row.status}</Typography>
      </Box>
    ),
    sorting: false,
  },
  {
    title: 'Date',
    render: (row: Partial<CITableBuildInfo>) => {
      return (
        <>
          <p>{formatDistance(new Date(), new Date(row.finishedAt!))} ago</p>
          <p>{row.duration} sec</p>
        </>
      );
    },
    sorting: false,
  },
  {
    title: 'Actions',
    render: (row: Partial<CITableBuildInfo>) => (
      <IconButton onClick={row.onRestartClick}>
        <RetryIcon />
      </IconButton>
    ),
    width: '10%',
    sorting: false,
  },
];

type Props = {
  loading: boolean;
  retry: () => void;
  builds: CITableBuildInfo[];
  projectName: string;
  page: number;
  onChangePage: (page: number) => void;
  total: number;
  pageSize: number;
  onChangePageSize: (pageSize: number) => void;
};

export const CITable: FC<Props> = ({
  projectName,
  loading,
  pageSize,
  page,
  retry,
  builds,
  onChangePage,
  onChangePageSize,
  total,
}) => {
  return (
    <>
      <Table
        isLoading={loading}
        options={{ paging: true, pageSize }}
        totalCount={total}
        page={page}
        actions={[
          {
            icon: () => <RetryIcon />,
            tooltip: 'Refresh Data',
            isFreeAction: true,
            onClick: retry,
          },
        ]}
        data={builds}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangePageSize}
        title={
          <Box display="flex" alignItems="center">
            <TravisIcon />
            <Box mr={1} />
            <Typography variant="h6">{projectName}</Typography>
          </Box>
        }
        columns={generatedColumns}
      />
    </>
  );
};

function TravisIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="50"
      height="50"
      viewBox="0 0 50 50"
      style={{ fill: '#000000' }}
    >
      <path d="M 24.40625 2.03125 C 24.035156 2.035156 23.53125 2.054688 22.90625 2.125 C 21.660156 2.265625 19.96875 2.59375 18.125 3.375 C 14.5 4.914063 10.261719 8.238281 7.625 14.96875 C 6.601563 15.371094 5.582031 15.863281 4.75 16.5 C 4.632813 16.59375 4.535156 16.710938 4.46875 16.84375 C 4.136719 17.535156 4.074219 18.292969 4.03125 19.125 C 3.988281 19.957031 4 20.808594 4.09375 21.5 C 4.183594 22.152344 4.386719 23.011719 4.625 23.8125 C 4.742188 24.210938 4.851563 24.601563 5 24.9375 C 5.140625 25.25 5.226563 25.539063 5.65625 25.84375 L 2.21875 31.9375 L 2.125 32.09375 C 1.8125 32.550781 1.933594 33.171875 2.390625 33.484375 C 2.847656 33.796875 3.46875 33.675781 3.78125 33.21875 C 3.78125 33.21875 4.660156 32.1875 6.0625 30.78125 C 6.164063 31.484375 6.296875 32.269531 6.5 32.875 C 6.671875 33.390625 6.953125 34.074219 7.25 34.6875 C 7.398438 34.996094 7.535156 35.273438 7.71875 35.53125 C 7.808594 35.660156 7.914063 35.804688 8.0625 35.9375 C 8.210938 36.070313 8.4375 36.25 8.875 36.25 C 9.285156 36.25 9.691406 36.1875 10.15625 36.125 C 10.171875 36.121094 10.171875 36.128906 10.1875 36.125 C 10.296875 36.523438 10.320313 36.714844 10.59375 37.40625 C 10.804688 37.9375 11.082031 38.503906 11.40625 39.0625 C 10.65625 39.03125 10.0625 39 10.0625 39 C 9.671875 38.972656 9.300781 39.171875 9.113281 39.515625 C 8.925781 39.859375 8.953125 40.28125 9.1875 40.59375 C 10.589844 42.457031 12.085938 43.78125 13.4375 44.65625 C 14.789063 45.53125 15.960938 46 17 46 C 17.265625 46 17.539063 45.96875 17.8125 45.9375 C 17.980469 46.039063 21.238281 48 25 48 C 29.878906 48 33.453125 44.90625 33.9375 44.46875 C 34.910156 44.261719 35.847656 44 36.5 43.75 C 37.261719 43.457031 37.84375 42.914063 38.4375 42.28125 C 39.03125 41.648438 39.621094 40.921875 40.125 40.21875 C 41.132813 38.8125 41.875 37.5 41.875 37.5 C 42.070313 37.15625 42.042969 36.726563 41.808594 36.410156 C 41.570313 36.089844 41.167969 35.941406 40.78125 36.03125 L 41.03125 35.21875 L 42.9375 35 C 43.285156 34.953125 43.578125 34.726563 43.71875 34.40625 C 43.71875 34.40625 44.296875 33.183594 44.53125 32.15625 C 44.652344 31.632813 44.757813 30.835938 44.84375 30.0625 C 44.929688 29.289063 45 28.722656 45 28.3125 C 45 27.722656 44.738281 27.542969 44.59375 27.40625 C 44.449219 27.269531 44.300781 27.1875 44.15625 27.09375 C 43.921875 26.945313 43.664063 26.816406 43.40625 26.6875 C 43.683594 26.605469 43.96875 26.527344 44.21875 26.4375 C 44.515625 26.332031 44.742188 26.246094 45.03125 26.0625 C 45.046875 26.050781 45.046875 26.042969 45.0625 26.03125 C 45.46875 25.757813 45.589844 25.480469 45.75 25.1875 C 45.917969 24.882813 46.078125 24.554688 46.21875 24.1875 C 46.5 23.453125 46.722656 22.636719 46.84375 21.96875 C 47.003906 21.074219 47.039063 20.089844 46.96875 19.1875 C 46.898438 18.285156 46.785156 17.527344 46.46875 16.875 C 46.398438 16.726563 46.289063 16.597656 46.15625 16.5 C 45.234375 15.792969 44.089844 15.277344 42.96875 14.875 C 40.636719 8.476563 36.292969 5.183594 32.46875 3.59375 C 30.507813 2.777344 28.664063 2.40625 27.3125 2.21875 C 26.636719 2.125 26.09375 2.082031 25.6875 2.0625 C 25.28125 2.042969 24.960938 2.03125 25 2.03125 C 25.109375 2.03125 24.953125 2.035156 24.84375 2.03125 C 24.734375 2.027344 24.59375 2.03125 24.40625 2.03125 Z M 24.4375 4.03125 C 24.59375 4.03125 24.691406 4.027344 24.78125 4.03125 C 24.871094 4.035156 24.855469 4.03125 25 4.03125 C 25.109375 4.03125 25.242188 4.046875 25.59375 4.0625 C 25.945313 4.078125 26.453125 4.101563 27.0625 4.1875 C 28.28125 4.355469 29.925781 4.703125 31.6875 5.4375 C 34.839844 6.746094 38.324219 9.246094 40.53125 14.15625 C 39.488281 13.882813 38.65625 13.6875 38.65625 13.6875 C 38.566406 13.664063 38.46875 13.652344 38.375 13.65625 C 37.824219 13.640625 37.359375 14.074219 37.34375 14.625 C 37.328125 15.175781 37.761719 15.640625 38.3125 15.65625 C 38.3125 15.65625 39.449219 15.859375 40.875 16.28125 C 41.097656 16.347656 41.332031 16.421875 41.5625 16.5 C 41.574219 16.503906 41.582031 16.527344 41.59375 16.53125 C 41.613281 16.542969 41.636719 16.554688 41.65625 16.5625 C 41.84375 16.710938 42.074219 16.789063 42.3125 16.78125 C 43.210938 17.132813 44.082031 17.554688 44.71875 18 C 44.800781 18.261719 44.917969 18.707031 44.96875 19.34375 C 45.027344 20.101563 44.992188 20.980469 44.875 21.625 C 44.789063 22.109375 44.578125 22.847656 44.34375 23.46875 C 44.226563 23.777344 44.101563 24.0625 44 24.25 C 43.949219 24.34375 43.898438 24.414063 43.875 24.4375 C 43.832031 24.457031 43.730469 24.492188 43.53125 24.5625 C 43.386719 24.613281 43.203125 24.667969 43.03125 24.71875 L 43.46875 23.0625 C 43.605469 22.527344 43.285156 21.980469 42.75 21.84375 C 42.75 21.84375 35.9375 20 25 20 C 23.273438 20 21.710938 20.070313 20.21875 20.15625 C 20.207031 20.15625 20.199219 20.15625 20.1875 20.15625 C 20.105469 20.136719 20.023438 20.125 19.9375 20.125 C 19.894531 20.132813 19.851563 20.144531 19.8125 20.15625 C 19.792969 20.15625 19.769531 20.15625 19.75 20.15625 C 19.589844 20.140625 19.429688 20.160156 19.28125 20.21875 C 12.585938 20.6875 8.695313 21.78125 8.375 21.875 C 8.367188 21.878906 8.285156 21.875 8.28125 21.875 C 8.183594 21.902344 8.085938 21.945313 8 22 C 7.980469 22.007813 7.957031 22.019531 7.9375 22.03125 C 7.9375 22.042969 7.9375 22.050781 7.9375 22.0625 C 7.917969 22.070313 7.894531 22.082031 7.875 22.09375 C 7.863281 22.105469 7.855469 22.113281 7.84375 22.125 C 7.824219 22.132813 7.800781 22.144531 7.78125 22.15625 C 7.78125 22.167969 7.78125 22.175781 7.78125 22.1875 C 7.761719 22.195313 7.738281 22.207031 7.71875 22.21875 C 7.71875 22.230469 7.71875 22.238281 7.71875 22.25 C 7.695313 22.269531 7.675781 22.289063 7.65625 22.3125 C 7.644531 22.332031 7.632813 22.355469 7.625 22.375 C 7.601563 22.414063 7.582031 22.457031 7.5625 22.5 L 6.75 23.90625 C 6.671875 23.710938 6.605469 23.507813 6.53125 23.25 C 6.328125 22.558594 6.160156 21.722656 6.09375 21.21875 C 6.023438 20.703125 5.996094 19.925781 6.03125 19.21875 C 6.0625 18.613281 6.152344 18.160156 6.21875 17.9375 C 7.199219 17.261719 8.710938 16.628906 10.0625 16.21875 C 11.503906 15.78125 12.65625 15.5625 12.65625 15.5625 C 13.152344 15.4375 13.472656 14.957031 13.398438 14.453125 C 13.328125 13.945313 12.886719 13.574219 12.375 13.59375 C 12.34375 13.601563 12.3125 13.613281 12.28125 13.625 C 12.28125 13.625 11.335938 13.804688 10.15625 14.125 C 12.589844 8.9375 15.980469 6.460938 18.90625 5.21875 C 20.535156 4.527344 22.03125 4.25 23.125 4.125 C 23.671875 4.0625 24.125 4.035156 24.4375 4.03125 Z M 21 8 L 21 11 L 23 11 L 23 10 L 24 10 L 24 16 L 23 16 L 23 18 L 27 18 L 27 16 L 26 16 L 26 10 L 27 10 L 27 11 L 29 11 L 29 8 Z M 22.75 22.0625 C 21.832031 22.472656 20.980469 22.882813 20.34375 23.21875 L 20.53125 22.15625 C 21.242188 22.117188 21.980469 22.082031 22.75 22.0625 Z M 30.09375 22.15625 C 31.226563 22.214844 32.285156 22.289063 33.25 22.375 C 32.277344 22.738281 31.238281 23.058594 30.28125 23.28125 C 29.722656 23.410156 29.746094 23.382813 29.28125 23.46875 C 29.453125 23.21875 29.628906 22.96875 29.78125 22.71875 C 29.898438 22.523438 30 22.347656 30.09375 22.15625 Z M 18.40625 22.5625 L 18 24.8125 C 17.917969 25.203125 18.074219 25.605469 18.398438 25.839844 C 18.726563 26.070313 19.160156 26.082031 19.5 25.875 C 19.5 25.875 23.535156 23.648438 27.375 22.65625 C 27.339844 22.707031 27.316406 22.761719 27.28125 22.8125 C 26.71875 23.585938 26.1875 24.25 26.1875 24.25 C 25.933594 24.5625 25.894531 25 26.082031 25.355469 C 26.273438 25.710938 26.660156 25.914063 27.0625 25.875 C 27.0625 25.875 28.691406 25.691406 30.71875 25.21875 C 32.726563 24.75 35.148438 24.019531 36.90625 22.78125 C 39.210938 23.113281 40.6875 23.453125 41.25 23.59375 L 40.6875 25.71875 C 40.589844 25.890625 40.546875 26.085938 40.5625 26.28125 L 39.375 30.75 L 36.71875 32.9375 L 29.71875 32.0625 L 27.9375 27.625 C 27.785156 27.242188 27.410156 26.996094 27 27 L 23 27 C 22.589844 26.996094 22.214844 27.242188 22.0625 27.625 L 20.25 32.15625 L 14.125 33.5 L 11.1875 31.96875 L 10.3125 27.03125 C 12.691406 25.207031 15.492188 23.472656 18.40625 22.5625 Z M 12.71875 23 C 10.773438 24.144531 9.011719 25.472656 7.5 26.75 C 7.453125 26.789063 7.453125 26.773438 7.40625 26.8125 L 9.15625 23.75 C 9.550781 23.636719 10.628906 23.363281 12.71875 23 Z M 32.15625 26.625 C 31.210938 26.65625 30.605469 27.890625 30.65625 29.375 C 30.707031 30.855469 31.492188 30.847656 32.4375 30.8125 C 33.707031 30.789063 34.394531 30.378906 35.03125 30.6875 C 35.023438 30.652344 34.847656 30.050781 33.96875 30.15625 C 34.070313 29.933594 34.09375 29.660156 34.0625 29.25 C 33.945313 27.769531 33.101563 26.59375 32.15625 26.625 Z M 18.375 26.96875 C 17.429688 26.976563 16.535156 28.203125 16.59375 29.6875 C 16.609375 30.074219 16.660156 30.363281 16.75 30.5625 C 15.925781 30.769531 15.699219 31.28125 15.6875 31.3125 C 16.207031 31.03125 16.800781 31.058594 17.71875 31.0625 C 17.816406 31.066406 17.894531 31.066406 18 31.0625 C 18.089844 31.0625 18.183594 31.066406 18.28125 31.0625 C 19.226563 31.054688 20.015625 31.140625 20 29.65625 C 19.984375 28.171875 19.320313 26.960938 18.375 26.96875 Z M 32.0625 27.5625 C 32.332031 27.554688 32.558594 27.765625 32.5625 28.03125 C 32.566406 28.296875 32.328125 28.523438 32.0625 28.53125 C 31.796875 28.535156 31.597656 28.296875 31.59375 28.03125 C 31.585938 27.765625 31.796875 27.566406 32.0625 27.5625 Z M 18.53125 27.90625 C 18.796875 27.898438 18.992188 28.105469 19 28.375 C 19.007813 28.640625 18.796875 28.867188 18.53125 28.875 C 18.261719 28.882813 18.070313 28.671875 18.0625 28.40625 C 18.054688 28.140625 18.261719 27.914063 18.53125 27.90625 Z M 42.09375 28.25 C 42.214844 28.304688 42.21875 28.3125 42.34375 28.375 C 42.582031 28.492188 42.800781 28.617188 42.96875 28.71875 C 42.949219 28.980469 42.90625 29.296875 42.84375 29.84375 C 42.757813 30.585938 42.660156 31.429688 42.59375 31.71875 C 42.496094 32.148438 42.261719 32.660156 42.09375 33.0625 L 40.125 33.3125 C 39.734375 33.355469 39.402344 33.625 39.28125 34 L 38.46875 36.65625 C 38.167969 36.734375 37.851563 36.816406 37.59375 36.875 C 37.195313 36.964844 36.796875 37.03125 36.875 37.03125 C 36.257813 37.03125 33.617188 37.003906 33.25 37 C 33.09375 36.925781 32.421875 36.632813 31.5625 36.21875 C 31.085938 35.988281 30.613281 35.726563 30.21875 35.53125 C 29.824219 35.335938 29.457031 35.148438 29.46875 35.15625 C 29.292969 35.042969 29.085938 34.988281 28.875 35 C 28.808594 35.003906 28.75 35.023438 28.6875 35.03125 C 28.777344 34.6875 28.675781 34.324219 28.425781 34.074219 C 28.175781 33.824219 27.8125 33.722656 27.46875 33.8125 C 27.113281 33.886719 26.824219 34.152344 26.71875 34.5 C 26.71875 34.5 26.617188 34.886719 26.3125 35.28125 C 26.007813 35.675781 25.632813 36 25 36 C 23.667969 36 23.25 34.6875 23.25 34.6875 C 23.210938 34.304688 22.953125 33.976563 22.589844 33.847656 C 22.226563 33.71875 21.820313 33.8125 21.546875 34.082031 C 21.277344 34.355469 21.183594 34.761719 21.3125 35.125 C 21.039063 35.101563 20.765625 35.191406 20.5625 35.375 L 17.8125 37.90625 C 17.714844 37.945313 17.066406 38.234375 16.15625 38.53125 C 15.359375 38.792969 14.4375 39.019531 13.875 39.09375 C 13.328125 38.5 12.816406 37.539063 12.46875 36.65625 C 12.0625 35.625 11.875 34.78125 11.875 34.78125 C 11.855469 34.695313 11.824219 34.609375 11.78125 34.53125 L 13.53125 35.4375 C 13.742188 35.550781 13.984375 35.582031 14.21875 35.53125 L 21.21875 33.96875 C 21.542969 33.902344 21.808594 33.679688 21.9375 33.375 L 23.6875 29 L 26.3125 29 L 28.0625 33.375 C 28.199219 33.71875 28.511719 33.957031 28.875 34 L 36.875 35 C 37.144531 35.03125 37.414063 34.953125 37.625 34.78125 L 40.875 32.09375 C 41.042969 31.957031 41.164063 31.773438 41.21875 31.5625 Z M 8.53125 28.46875 L 9.34375 32.8125 C 9.398438 33.105469 9.582031 33.355469 9.84375 33.5 L 10.71875 34 C 10.71875 34 10.320313 34.0625 9.875 34.125 C 9.613281 34.160156 9.488281 34.164063 9.28125 34.1875 C 9.214844 34.074219 9.113281 33.984375 9.03125 33.8125 C 8.789063 33.3125 8.546875 32.671875 8.40625 32.25 C 8.304688 31.945313 8.160156 31.089844 8.0625 30.40625 C 7.964844 29.722656 7.90625 29.15625 7.90625 29.15625 C 7.90625 29.125 7.90625 29.09375 7.90625 29.0625 C 8.125 28.867188 8.300781 28.667969 8.53125 28.46875 Z M 28.8125 37.0625 C 28.972656 37.144531 29.085938 37.230469 29.3125 37.34375 C 29.722656 37.546875 30.238281 37.765625 30.71875 38 C 31.679688 38.464844 32.5625 38.90625 32.5625 38.90625 C 32.699219 38.96875 32.847656 39.003906 33 39 C 33 39 36.175781 39.03125 36.875 39.03125 C 37.292969 39.03125 37.589844 38.945313 38.03125 38.84375 C 38.242188 38.796875 38.488281 38.714844 38.71875 38.65625 C 38.585938 38.851563 38.617188 38.855469 38.46875 39.0625 C 38 39.71875 37.5 40.378906 37 40.90625 C 36.5 41.433594 35.992188 41.792969 35.78125 41.875 C 34.773438 42.261719 30.605469 43 30 43 C 29.824219 43 28.433594 42.734375 28.34375 42.6875 C 27.679688 42.324219 25.625 40.75 25.625 40.75 C 25.273438 40.464844 24.773438 40.453125 24.40625 40.71875 C 24.40625 40.71875 23.710938 41.238281 22.90625 41.78125 C 22.101563 42.324219 21.054688 42.933594 20.96875 42.96875 C 19.980469 43.359375 18.03125 44 17 44 C 16.667969 44 15.667969 43.738281 14.53125 43 C 13.835938 42.550781 13.0625 41.886719 12.28125 41.09375 C 12.707031 41.109375 12.933594 41.121094 13.25 41.125 C 13.414063 41.167969 13.585938 41.167969 13.75 41.125 C 14.730469 41.082031 15.808594 40.757813 16.78125 40.4375 C 17.824219 40.097656 18.65625 39.75 18.65625 39.75 C 18.769531 39.707031 18.875 39.644531 18.96875 39.5625 L 21.46875 37.25 C 21.726563 37.339844 21.839844 37.394531 22.3125 37.53125 C 22.980469 37.726563 23.761719 37.90625 24.53125 37.96875 C 24.683594 37.988281 24.832031 38 25 38 C 25.171875 38 25.34375 37.992188 25.5 37.96875 C 25.542969 37.964844 25.585938 37.941406 25.625 37.9375 C 25.644531 37.933594 25.667969 37.941406 25.6875 37.9375 C 26.347656 37.847656 26.941406 37.65625 27.46875 37.46875 C 28.085938 37.25 28.535156 37.113281 28.8125 37.0625 Z M 25 42.75 C 25.523438 43.164063 26.476563 43.945313 27.375 44.4375 C 28.054688 44.808594 28.761719 44.957031 29.34375 45 C 28.105469 45.554688 26.605469 46 25 46 C 23.507813 46 22.023438 45.589844 20.875 45.15625 C 21.191406 45.042969 21.480469 44.9375 21.71875 44.84375 C 22.425781 44.566406 23.203125 43.996094 24.03125 43.4375 C 24.546875 43.089844 24.714844 42.949219 25 42.75 Z" />
    </svg>
  );
}
