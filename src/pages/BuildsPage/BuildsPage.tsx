import React, { FC, useState, useCallback } from 'react';
import { Content } from '@backstage/core';
import { Grid, Snackbar } from '@material-ui/core';
import { Builds as BuildsComp } from './lib/Builds';
import { Layout } from '../../components/Layout';
import { PluginHeader } from '../../components/PluginHeader';
import { Alert } from '@material-ui/lab';

const BuildsPage: FC<{}> = () => (
  <Layout>
    <Content>
      <Builds />
    </Content>
  </Layout>
);

const Builds = () => {
  const [restarted, setRestarted] = useState(false);
  const handleRestart = useCallback(() => {
    setRestarted(true);
  }, [setRestarted]);

  return (
    <>
      <Snackbar
        autoHideDuration={1000}
        open={restarted}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={() => setRestarted(false)}
      >
        <Alert severity="success">Build Restarted.</Alert>
      </Snackbar>
      <PluginHeader title="All builds" />
      <Grid container spacing={3} direction="column">
        <Grid item>
          <BuildsComp onRestart={handleRestart} />
        </Grid>
      </Grid>
    </>
  );
};

export default BuildsPage;
export { Builds };
