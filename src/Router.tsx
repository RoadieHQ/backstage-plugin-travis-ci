import { Entity } from '@backstage/catalog-model';
import { WarningPanel } from '@backstage/core';
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
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { App } from './components/App';
import { TRAVIS_ANNOTATION } from './hooks/useTravisRepoData';

type Props = { entity: Entity };

export const isPluginApplicableToEntity = (entity: Entity) =>
  Boolean(entity?.metadata.annotations?.[TRAVIS_ANNOTATION]);

export const Router: React.FC<Props> = ({ entity }) =>
  !isPluginApplicableToEntity(entity) ? (
    <WarningPanel title="Firebase functions plugin:">
      <pre>{TRAVIS_ANNOTATION}</pre> annotation is missing on the entity.
    </WarningPanel>
  ) : (
    <Routes>
      <Route path="/" element={<App entity={entity} />} />
    </Routes>
  );
