import { useRef } from 'react';

export const useAsyncPolling = (
  pollingFn: () => Promise<any>,
  interval: number,
) => {
  const isPolling = useRef<boolean>(false);
  const startPolling = async () => {
    if (isPolling.current === true) return;
    isPolling.current = true;

    while (isPolling.current === true) {
      await pollingFn();
      await new Promise(resolve => setTimeout(resolve, interval));
    }
  };

  const stopPolling = () => {
    isPolling.current = false;
  };
  return { startPolling, stopPolling };
};
