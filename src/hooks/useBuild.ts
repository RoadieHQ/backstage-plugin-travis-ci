import { errorApiRef, useApi } from '@backstage/core';
import { useCallback } from 'react';
import { useAsyncRetry } from 'react-use';
import { travisCIApiRef } from '../api/index';
import { useAsyncPolling } from './useAsyncPolling';
import { useTravisRepoData } from './useTravisRepoData';

const INTERVAL_AMOUNT = 1500;
export function useBuild(buildId: number) {
  const repoSlug = useTravisRepoData();
  const api = useApi(travisCIApiRef);
  const errorApi = useApi(errorApiRef);

  const getBuild = useCallback(async () => {
    try {
      const build = await api.getBuild(buildId);
      return Promise.resolve(build);
    } catch (e) {
      errorApi.post(e);
      return Promise.reject(e);
    }
  }, [repoSlug, buildId, api, errorApi]);

  const restartBuild = async () => {
    try {
      await api.retry(buildId);
    } catch (e) {
      errorApi.post(e);
    }
  };

  const { loading, value, retry } = useAsyncRetry(() => getBuild(), [getBuild]);

  const { startPolling, stopPolling } = useAsyncPolling(
    getBuild,
    INTERVAL_AMOUNT,
  );

  return [
    { loading, value, retry },
    {
      restartBuild,
      startPolling,
      stopPolling,
    },
  ] as const;
}
