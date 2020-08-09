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

import { createApiRef } from '@backstage/core';
import { API_BASE_URL } from './constants';

function createHeaders(token: string) {
  return new Headers({
    Authorization: `token ${token}`,
    'Travis-API-Version': '3',
  });
}

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

export class TravisCIApi {
  apiUrl: string;
  constructor(apiUrl: string = '/travisci/api') {
    this.apiUrl = apiUrl;
  }

  async retry(
    travisVersion: string,
    buildNumber: number,
    { token }: { token: string },
  ) {
    return fetch(`https://api.${travisVersion}/build/${buildNumber}/restart`, {
      headers: createHeaders(token),
      method: 'post',
    });
  }

  async getBuilds(
    {
      travisVersion,
      limit = 10,
      offset = 0,
    }: {
      travisVersion: string;
      limit: number;
      offset: number;
    },
    { token, owner, repo }: { token: string; owner: string; repo: string },
  ) {
    const repoSlug = encodeURIComponent(`${owner}/${repo}`);

    const response = await (
      await fetch(
        `https://api.${travisVersion}/repo/${repoSlug}/builds?offset=${offset}&limit=${limit}`,
        {
          headers: createHeaders(token),
        },
      )
    ).json();

    return response.builds;
  }

  async getUser(token: string) {
    return await (
      await fetch(`${API_BASE_URL}user`, {
        headers: createHeaders(token),
      })
    ).json();
  }

  async getBuild(
    buildId: number,
    { token }: { token: string },
  ): Promise<TravisCIBuildResponse> {
    const response = await fetch(`${API_BASE_URL}build/${buildId}`, {
      headers: createHeaders(token),
    });

    return response.json();
  }
}
