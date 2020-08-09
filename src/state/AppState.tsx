import React, { FC, useReducer, Dispatch, Reducer } from 'react';
import { travisCIApiRef } from '../api';
import type { State, Action, SettingsState } from './types';

export type { SettingsState };

export const AppContext = React.createContext<[State, Dispatch<Action>]>(
  [] as any,
);
export const STORAGE_KEY = `${travisCIApiRef.id}.settings`;

const initialState: State = {
  owner: '',
  repo: '',
  token: '',
  travisVersion: 'travis-ci.com',
  showSettings: false,
};

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'setCredentials':
      return {
        ...state,
        ...action.payload,
      };
    case 'showSettings':
      return { ...state, showSettings: true };
    case 'hideSettings':
      return { ...state, showSettings: false };
    default:
      return state;
  }
};

export const AppStateProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={[state, dispatch]}>
      {children}
    </AppContext.Provider>
  );
};
