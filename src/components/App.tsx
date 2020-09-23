import { Entity } from '@backstage/catalog-model';
import React from 'react';
import { Builds } from '../components/BuildsPage';
import { ContextProvider } from './ContextProvider';
import { LastBuildCard } from './LastBuildCard';

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

export const TravisCIWidget: React.FC<Props> = ({ entity }) => {
  return (
    <ContextProvider entity={entity}>
      <LastBuildCard />
    </ContextProvider>
  );
};
