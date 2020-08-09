export type Settings = {
  owner: string;
  repo: string;
  token: string;
  travisVersion: string;
};
export type SettingsState = Settings & {
  showSettings: boolean;
};

export type State = SettingsState;

type SettingsAction =
  | {
      type: 'setCredentials';
      payload: {
        repo: string;
        owner: string;
        token: string;
        travisVersion: string;
      };
    }
  | { type: 'showSettings' }
  | { type: 'hideSettings' };

export type Action = SettingsAction;
