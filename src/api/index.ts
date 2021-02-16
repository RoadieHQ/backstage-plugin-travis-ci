import { createApiRef, DiscoveryApi, IdentityApi } from '@backstage/core';
import fetch from 'cross-fetch';

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
    }
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
export interface TravisCIApi {
  retry(buildNumber: number): Promise<Response>;
  getBuilds(options: {
    limit: number;
    offset: number;
    repoSlug: string;
  }): Promise<any>;
  getUser(): any;
  getBuild(buildId: number): Promise<TravisCIBuildResponse>;
}

export const travisCIApiRef = createApiRef<TravisCIApi>({
  id: 'plugin.travisci.service',
  description: 'Used by the TravisCI plugin to make requests',
});

export class TravisCIApiClient implements TravisCIApi {
  baseUrl: string;
  discoveryApi: DiscoveryApi;
  identityApi: IdentityApi;

  constructor(options: { discoveryApi: DiscoveryApi, identityApi: IdentityApi }) {
    this.baseUrl = '/travisci/api';
    this.discoveryApi = options.discoveryApi;
    this.identityApi = options.identityApi;
  }

  async retry(buildNumber: number) {
    const idToken = await this.identityApi.getIdToken();
    return fetch(`${await this.getApiUrl()}/build/${buildNumber}/restart`, {
      method: 'post',
      headers: new Headers({
        'Travis-API-Version': '3',
        ...(idToken && { Authorization: `Bearer ${idToken}` }),
      }),
    });
  }

  async getBuilds({ limit = 10, offset = 0, repoSlug }: FetchParams) {
    const idToken = await this.identityApi.getIdToken();
    const response = await fetch(
      `${await this.getApiUrl()}/repo/${encodeURIComponent(
        repoSlug
      )}/builds?offset=${offset}&limit=${limit}`,
      {
        headers: new Headers({
          'Travis-API-Version': '3',
          ...(idToken && { Authorization: `Bearer ${idToken}` }),
        }),
      }
    );

    if (!response.ok) {
      throw new Error(
        `error while fetching travis builds: ${response.status}: ${response.statusText}`
      );
    }

    return (await response.json()).builds;
  }

  async getUser() {
    const idToken = await this.identityApi.getIdToken();
    return await (
      await fetch(`${await this.getApiUrl()}/user`, {
        headers: new Headers({
          'Travis-API-Version': '3',
          ...(idToken && { Authorization: `Bearer ${idToken}` }),
        }),
      })
    ).json();
  }

  async getBuild(buildId: number): Promise<TravisCIBuildResponse> {
    const idToken = await this.identityApi.getIdToken();
    const response = await fetch(`${await this.getApiUrl()}/build/${buildId}`, {
      headers: new Headers({
        'Travis-API-Version': '3',
        ...(idToken && { Authorization: `Bearer ${idToken}` }),
      }),
    });

    return response.json();
  }

  private async getApiUrl() {
    const proxyUrl = await this.discoveryApi.getBaseUrl('proxy');
    return proxyUrl + this.baseUrl;
  }
}
