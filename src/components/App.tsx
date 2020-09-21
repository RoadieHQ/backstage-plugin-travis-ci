import { Entity } from '@backstage/catalog-model';
import React from 'react';
import { Route, MemoryRouter, Routes } from 'react-router';
import { Builds } from '../components/BuildsPage';
import { ContextProvider } from './ContextProvider';

type Props = {
  entity: Entity;
};

export const App: React.FC<Props> = ({ entity }) => {
  return (
    <ContextProvider entity={entity}>
      <Builds />
    </ContextProvider>
  );
};

// TODO: allow pass in settings as props
// When some shared settings workflow
// will be established
export const TravisCIWidget = (entity: Entity) => {
  return (
    <MemoryRouter initialEntries={['/travisci']}>
      <ContextProvider entity={entity}>
        <Routes>
          <Route path="/travisci" element={<Builds />} />
        </Routes>
      </ContextProvider>
    </MemoryRouter>
  );
};
