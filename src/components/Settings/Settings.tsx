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
import React, { useState, useEffect, useCallback } from 'react';
import {
  Button,
  TextField,
  List,
  ListItem,
  Snackbar,
  Box,
  Dialog,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useSettings } from '../../state';

const Settings = () => {
  const [
    {
      repo: repoFromStore,
      owner: ownerFromStore,
      token: tokenFromStore,
      travisVersion: travisVersionFromStore,
      showSettings,
    },
    { saveSettings, hideSettings },
  ] = useSettings();

  const [travisVersion, setTravisVersion] = useState(
    () => travisVersionFromStore,
  );
  const [token, setToken] = useState(() => tokenFromStore);
  const [owner, setOwner] = useState(() => ownerFromStore);
  const [repo, setRepo] = useState(() => repoFromStore);

  useEffect(() => {
    if (tokenFromStore !== token) {
      setToken(token);
    }
    if (ownerFromStore !== owner) {
      setOwner(owner);
    }
    if (repoFromStore !== repo) {
      setRepo(repo);
    }
  }, [ownerFromStore, repoFromStore, tokenFromStore, token, owner, repo]);

  const [saved, setSaved] = useState(false);

  const handleSaveSettings = useCallback(
    event => {
      event.preventDefault();
      setSaved(true);
      saveSettings({ repo, owner, token, travisVersion });
      hideSettings();
    },
    [travisVersion, repo, owner, token, setSaved, saveSettings, hideSettings],
  );

  return (
    <>
      <Snackbar
        autoHideDuration={1000}
        open={saved}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={() => setSaved(false)}
      >
        <Alert severity="success">Credentials saved.</Alert>
      </Snackbar>
      <Dialog open={showSettings} onClose={hideSettings}>
        <DialogTitle>Project Credentials</DialogTitle>
        <Box minWidth="400px">
          <form noValidate onSubmit={handleSaveSettings}>
            <List>
              <ListItem>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Travis Domain
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={travisVersion}
                    onChange={e => setTravisVersion(e.target.value as string)}
                  >
                    <MenuItem value="travis-ci.com">travis-ci.com</MenuItem>
                    <MenuItem value="travis-ci.org">travis-ci.org</MenuItem>
                  </Select>
                </FormControl>
              </ListItem>
              <ListItem>
                <TextField
                  name="travisci-token"
                  label="Token"
                  value={token}
                  fullWidth
                  placeholder="xyz123"
                  variant="outlined"
                  onChange={e => setToken(e.target.value)}
                  helperText="Get this from your Travis CI settings page"
                />
              </ListItem>
              <ListItem>
                <TextField
                  name="travisci-owner"
                  fullWidth
                  label="Owner"
                  variant="outlined"
                  placeholder="spotify"
                  value={owner}
                  onChange={e => setOwner(e.target.value)}
                />
              </ListItem>
              <ListItem>
                <TextField
                  name="travisci-repo"
                  label="Repo"
                  fullWidth
                  placeholder="backstage"
                  variant="outlined"
                  value={repo}
                  onChange={e => setRepo(e.target.value)}
                />
              </ListItem>
              <ListItem>
                <Box mt={2} display="flex" width="100%" justifyContent="center">
                  <Button
                    type="submit"
                    variant="outlined"
                    color="primary"
                    onClick={handleSaveSettings}
                  >
                    Save credentials
                  </Button>
                </Box>
              </ListItem>
            </List>
          </form>
        </Box>
      </Dialog>
    </>
  );
};

export default Settings;
