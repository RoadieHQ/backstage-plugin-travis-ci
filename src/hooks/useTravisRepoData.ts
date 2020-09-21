/*
 * Copyright 2020 RoadieHQ
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

import { useSettings } from './useSettings';

export const TRAVIS_ANNOTATION = 'travis-ci.com/repo-slug';

export const useTravisRepoData = () => {
  const [{ entity }] = useSettings();
  console.log(entity);
  const travisSlug = entity?.metadata.annotations?.[TRAVIS_ANNOTATION] ?? '';
  if (!travisSlug) {
    throw new Error("'Travis-ci.com' annottation is missing");
  }
  const slugElements = travisSlug.split('/').map(p => p.trim());
  console.log(slugElements);
  if (slugElements.length < 5) {
    throw new Error("'Travis-ci.com' annottation is missing");
  }
  return {
    domain: slugElements[1],
    owner: slugElements[3],
    repo: slugElements[5],
  };
};
