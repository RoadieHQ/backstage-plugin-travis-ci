import { errorApiRef, useApi } from '@backstage/core';
import { useContext, useEffect } from 'react';
import { AppContext, STORAGE_KEY } from './AppState';
import { Settings } from './types';

export function useSettings() {
  const [settings, dispatch] = useContext(AppContext);

  const errorApi = useApi(errorApiRef);

  useEffect(() => {
    const rehydrate = () => {
      try {
        const stateFromStorage = JSON.parse(
          sessionStorage.getItem(STORAGE_KEY)!,
        );
        if (
          stateFromStorage &&
          Object.keys(stateFromStorage).some(
            k => (settings as any)[k] !== stateFromStorage[k],
          )
        )
          dispatch({
            type: 'setCredentials',
            payload: stateFromStorage,
          });
      } catch (error) {
        errorApi.post(error);
      }
    };

    rehydrate();
  }, [dispatch, errorApi, settings]);

  const persist = (state: Settings) => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  };

  return [
    settings,
    {
      saveSettings: (state: Settings) => {
        persist(state);
        dispatch({
          type: 'setCredentials',
          payload: state,
        });
      },
      showSettings: () => dispatch({ type: 'showSettings' }),
      hideSettings: () => dispatch({ type: 'hideSettings' }),
    },
  ] as const;
}
