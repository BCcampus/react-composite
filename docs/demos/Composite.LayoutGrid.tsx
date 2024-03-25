import React from 'react';
import { Composite, CompositeProps } from '@bccampus/react-composite';
import classes from './Composite.grid.module.css';

export function LayoutGrid<T>({
  items,
  getItemKey,
  selectionState,
  defaultSelectionState,
  onSelectionChange,
  disabledKeys,
  focusOptions,
  selectionOptions,
  renderItem,
}: Omit<CompositeProps<T>, 'type'>) {
  return (
    <Composite
      // {...props}
      type="LayoutGrid"
      disabledKeys={disabledKeys}
      defaultSelectionState={defaultSelectionState}
      selectionState={selectionState}
      onSelectionChange={onSelectionChange}
      focusOptions={focusOptions}
      selectionOptions={selectionOptions}
      items={items}
      getItemKey={getItemKey}
      renderItem={renderItem}
      renderRoot={({ role, ...rootProps }) => (
        <div role={role} className={classes.grid}>
          <div {...rootProps} role="row" className={classes.row} />
        </div>
      )}
    />
  );
}
