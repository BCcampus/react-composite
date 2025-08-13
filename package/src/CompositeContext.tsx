/**
 * Provides:
 * - FocusManager
 * - data
 */

'use client';

import React, { JSX } from 'react';
import { type FocusManager } from './FocusManager/FocusManager';

interface CompositeContextValue {
  focusManager: FocusManager;
}

export const CompositeContext = React.createContext<CompositeContextValue | undefined>(undefined);

export const useCompositeContext = () => {
  const context = React.useContext(CompositeContext);

  if (!context) {
    throw new Error(
      'No CompositeContext has been set, use CompositeContextProvider to provide a context'
    );
  }

  return context;
};

export type QueryClientProviderProps = {
  context: CompositeContextValue;
  children?: React.ReactNode;
};

export const CompositeContextProvider = ({
  context,
  children,
}: QueryClientProviderProps): JSX.Element => {
  React.useEffect(
    () =>
      // client.mount();
      () => {
        //   client.unmount();
      },
    [context]
  );

  return <CompositeContext.Provider value={context}>{children}</CompositeContext.Provider>;
};
