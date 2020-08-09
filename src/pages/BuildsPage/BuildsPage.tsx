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
