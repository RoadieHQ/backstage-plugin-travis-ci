import React from 'react';
import { Header, Page, pageTheme, HeaderLabel } from '@backstage/core';

export const Layout: React.FC = ({ children }) => {
  return (
    <Page theme={pageTheme.tool}>
      <Header title="TravisCI" subtitle="See recent builds and their status">
        <HeaderLabel label="Owner" value="RoadieHQ" />
        <HeaderLabel label="Lifecycle" value="Alpha" />
      </Header>
      {children}
    </Page>
  );
};
