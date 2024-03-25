import React from 'react';
import {
  Composite,
  CompositeItemRenderer,
  FocusOptions,
  SelectionOptions,
} from '@bccampus/react-composite';
import classes from './Composite.grid.module.css';

export interface DemoCompositeComponentProps<T> extends SelectionOptions, FocusOptions {
  renderItem: CompositeItemRenderer<T>;
  items: T[];
}

export function ConfiguratorDemoGrid<T>({
  multiple,
  followFocus,
  trackSelectioMode,
  loop,
  moveToNextColumn,
  moveToNextRow,
  renderItem,
  items,
  ...rest
}: DemoCompositeComponentProps<T>) {
  return (
    <Composite
      {...rest}
      type="LayoutGrid"
      items={items}
      focusOptions={{ loop, moveToNextRow, moveToNextColumn }}
      selectionOptions={{ multiple, followFocus, trackSelectioMode }}
      renderRoot={({ role, children, ...rootProps }) => (
        <div role={role} className={classes.grid}>
          <div {...rootProps} role="row" className={classes.row}>
            {children}
          </div>
        </div>
      )}
      renderItem={renderItem}
    />
  );
}
