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
  limit: number;
  offset: number;
  repoSlug: string;
};

export class TravisCIApi {
  baseUrl: string;

  constructor(backendUrl: string = 'http://localhost:7000') {
    this.baseUrl = backendUrl + API_BASE_URL;
  }

  async retry(buildNumber: number) {
    return fetch(`${this.baseUrl}/build/${buildNumber}/restart`, {
      method: 'post',
      headers: new Headers({
        'Travis-API-Version': '3',
      }),
    });
  }

  async getBuilds({ limit = 10, offset = 0, repoSlug }: FetchParams) {
    const response = await fetch(
      `${this.baseUrl}/repo/${encodeURIComponent(
        repoSlug,
      )}/builds?offset=${offset}&limit=${limit}`,
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

  async getUser() {
    return await (
      await fetch(`${this.baseUrl}/user`, {
        headers: new Headers({
          'Travis-API-Version': '3',
        }),
      })
    ).json();
  }

  async getBuild(buildId: number): Promise<TravisCIBuildResponse> {
    const response = await fetch(`${this.baseUrl}/build/${buildId}`, {
      headers: new Headers({
        'Travis-API-Version': '3',
      }),
    });

    return response.json();
  }
}
