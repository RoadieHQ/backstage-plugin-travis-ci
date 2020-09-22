import { createApiRef } from '@backstage/core';
import { API_BASE_URL } from './constants';

export const travisCIApiRef = createApiRef<TravisCIApi>({
  id: 'plugin.travisci.service',
  description: 'Used by the TravisCI plugin to make requests',
});

export type TravisCIBuildResponse = {
  '@type': string;
  '@href': string;
  '@representation': string;
  '@permissions': {
    read: boolean;
    cancel: boolean;
    restart: boolean;
  };
  id: number;
  number: string;
  state: string;
  duration: number;
  event_type: string;
  previous_state: string;
  pull_request_title?: string;
  pull_request_number?: number;
  started_at: string;
  finished_at: string;
  private: boolean;
  repository: {
    '@type': string;
    '@href': string;
    '@representation': string;
    id: number;
    name: string;
    slug: string;
  };
  branch: {
    '@type': string;
    '@href': string;
    '@representation': string;
    name: string;
  };
  tag?: any;
  commit: {
    '@type': string;
    '@representation': string;
    id: number;
    sha: string;
    ref: string;
    message: string;
    compare_url: string;
    committed_at: string;
  };
  jobs: [
    {
      '@type': string;
      '@href': string;
      '@representation': string;
      id: number;
    },
  ];
  stages: any[];
  created_by: {
    '@type': string;
    '@href': string;
    '@representation': string;
    id: number;
    login: string;
  };
  updated_at: string;
};

type FetchParams = {
  address: string;
  travisDomain: string;
  limit: number;
  offset: number;
  owner: string;
  repo: string;
};

export class TravisCIApi {
  async retry(travisVersion: string, buildNumber: number) {
    return fetch(`https://api.${travisVersion}/build/${buildNumber}/restart`, {
      method: 'post',
    });
  }

  async getBuilds({
    address,
    travisDomain,
    limit = 10,
    offset = 0,
    owner,
    repo,
  }: FetchParams) {
    const repoSlug = encodeURIComponent(`${owner}/${repo}`);
    const response = await fetch(
      `${address}/proxy/travisci${
        travisDomain === 'travis-ci.com' ? 'com' : 'org'
      }/api/repo/${repoSlug}/builds?offset=${offset}&limit=${limit}`,
      {
        headers: new Headers({
          'Travis-API-Version': '3',
        }),
      },
    );

    if (!response.ok) {
      throw new Error(
        `error while fetching travis builds: ${response.status}: ${response.statusText}`,
      );
    }

    return (await response.json()).builds;
  }

  async getUser(token: string) {
    return await (
      await fetch(`${API_BASE_URL}user`, {
        headers: new Headers({
          'Travis-API-Version': '3',
        }),
      })
    ).json();
  }

  async getBuild(
    buildId: number,
    { token }: { token: string },
  ): Promise<TravisCIBuildResponse> {
    const response = await fetch(`${API_BASE_URL}build/${buildId}`, {
      headers: new Headers({
        'Travis-API-Version': '3',
      }),
    });

    return response.json();
  }
}
