import React, { FC, useState, useCallback } from 'react';
import { Grid, Snackbar } from '@material-ui/core';
import { Builds as BuildsComp } from './lib/Builds';
import { PluginHeader } from '../../components/PluginHeader';
import { Alert } from '@material-ui/lab';

export const Builds: FC = () => {
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
