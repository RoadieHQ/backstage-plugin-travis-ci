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
import { Route, MemoryRouter, Routes } from 'react-router';
import { BuildsPage, Builds } from '../pages/BuildsPage';
import { AppStateProvider } from '../state';
import { Settings } from './Settings';

export const App = () => {
  return (
    <AppStateProvider>
      <>
        <Routes>
          <Route path="/" element={<BuildsPage />} />
        </Routes>
        <Settings />
      </>
    </AppStateProvider>
  );
};

// TODO: allow pass in settings as props
// When some shared settings workflow
// will be established
export const TravisCIWidget = () => {
  return (
    <MemoryRouter initialEntries={['/travisci']}>
      <AppStateProvider>
        <>
          <Routes>
            <Route path="/travisci" element={<Builds />} />
          </Routes>
          <Settings />
        </>
      </AppStateProvider>
    </MemoryRouter>
  );
};
