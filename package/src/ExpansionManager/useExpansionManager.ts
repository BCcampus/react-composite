import { Key, useMemo, useState } from 'react';
import { ExpansionManager } from './ExpansionManager';
import { useUncontrolled } from '../hooks/use-uncontrolled/use-uncontrolled';
import { useDidUpdate } from '../hooks/use-did-update/use-did-update';

import type { CompositeExpansionProps, ExpansionOptions } from '../Composite.types';
import type { FocusManager } from '../FocusManager/FocusManager';

export const useExpansionManager = (
  focusManager: FocusManager,
  options: false | ExpansionOptions,
  state?: CompositeExpansionProps
) => {
  if (options === false) return [undefined, undefined, undefined] as const;

  const [expandedKeys, setExpandedKeys] = useUncontrolled({
    value: state.expandedKeys,
    defaultValue: state.defaultExpandedKeys,
    onChange: state.onExpansionChange,
    finalValue: new Set<Key>(),
  });

  const [expandingKeys, setExpandingKeys] = useState(new Set<Key>());

  const expansionManager = useMemo<ExpansionManager>(
    () =>
      new ExpansionManager({
        focusManager,
        options,
        initialState: expandedKeys,
        setExpandedKeys,
        setExpandingKeys,
      }),
    [focusManager, options]
  );

  useDidUpdate(() => {
    expansionManager.setExpansions(expandedKeys);
  }, [expandedKeys]);

  return [expandedKeys, expandingKeys, expansionManager] as const;
};
