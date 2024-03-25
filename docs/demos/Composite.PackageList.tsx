import React, { useMemo } from 'react';
import { Checkbox, Flex, Paper } from '@mantine/core';
import { Composite, CompositeProps } from '@bccampus/react-composite';
import { mantineComponents } from './_data';
import classes from './Composite.demo.module.css';

export function PackageList(
  props: Omit<CompositeProps<string>, 'type' | 'items' | 'getItemKey' | 'renderItem'>
) {
  const packages = useMemo(
    () =>
      mantineComponents.reduce((_packages, component) => {
        if (component.package) _packages.add(component.package);
        return _packages;
      }, new Set<string>()),

    []
  );

  return (
    <Composite
      {...props}
      type="VerticalListbox"
      items={[...packages]}
      getItemKey={(item) => item}
      renderRoot={(rootProps) => <Flex {...rootProps} direction="column" gap="xs" />}
      renderItem={({ item, ...itemProps }, { selected, onSelectMouseEventHandler }) => (
        <Paper {...itemProps} p="xs" className={classes.compositeItem}>
          <Checkbox
            readOnly
            checked={!!selected}
            disabled={itemProps['aria-disabled']}
            label={item}
            onClick={onSelectMouseEventHandler}
          />
        </Paper>
      )}
    />
  );
}
