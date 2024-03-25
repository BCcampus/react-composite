import { Key, useMemo, useRef } from 'react';
import { SelectionManager } from './SelectionManager';
import { useUncontrolled } from '../hooks/use-uncontrolled/use-uncontrolled';
import { useDidUpdate } from '../hooks/use-did-update/use-did-update';

import type { CompositeSelectionProps, SelectionOptions } from '../Composite.types';
import type { FocusManager } from '../FocusManager/FocusManager';

export const useSelectionManager = (
  focusManager: FocusManager,
  options: false | SelectionOptions,
  state?: CompositeSelectionProps
) => {
  if (options === false) return [undefined, undefined, undefined] as const;

  const [selectionState, changeSelectionState] = useUncontrolled({
    value: state.selectionState,
    defaultValue: state.defaultSelectionState,
    onChange: state.onSelectionChange,
    finalValue: { selected: new Set<Key>() },
  });

  const selectionManager = useMemo<SelectionManager>(
    () =>
      new SelectionManager({
        focusManager,
        initialState: selectionState,
        setSelectionState: changeSelectionState,
        options,
      }),
    [focusManager, options]
  );

  useDidUpdate(() => {
    selectionManager.setSelections(selectionState);
  }, [selectionState]);

  const _context = useRef({ multiple: false, selectionMode: false });
  const context = useMemo(() => {
    if (options && selectionState) {
      const currMode = options.trackSelectioMode && selectionState.selected.size > 0;

      if (
        currMode !== _context.current.selectionMode ||
        _context.current.multiple !== options.multiple
      ) {
        _context.current = {
          multiple: options.multiple,
          selectionMode: currMode,
        };
      }
    }
    return _context.current;
  }, [options, selectionState]);

  return [selectionState, selectionManager, context] as const;
};
