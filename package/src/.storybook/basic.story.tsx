import React, { useState } from 'react';
import { IconCheck } from '@tabler/icons-react';
import { Flex, Group, Text } from '@mantine/core';
import { Composite } from '../Composite';
import { CompositeItemRenderer, SelectionState } from '../Composite.types';

import classes from './main.module.css';

export default { title: 'Composite' };

interface StoryItem {
  id: number;
  label: string;
}
const items: StoryItem[] = [
  { id: 1, label: 'Item 1' },
  { id: 2, label: 'Item 2' },
  { id: 3, label: 'Item 3' },
  { id: 4, label: 'Item 4' },
  { id: 5, label: 'Item 5' },
  { id: 6, label: 'Item 6' },
  { id: 7, label: 'Item 7' },
  { id: 8, label: 'Item 8' },
  { id: 9, label: 'Item 9' },
  { id: 10, label: 'Item 10' },
  { id: 11, label: 'Item 11' },
];

const renderItem: CompositeItemRenderer<StoryItem> = (
  { item, ...props },
  { selected, onSelectMouseEventHandler }
) => (
  <Group {...props} onClickCapture={onSelectMouseEventHandler}>
    <Text pl="xs">{item.label}</Text>
    {selected && <IconCheck size="1rem" />}
  </Group>
);

export function Usage() {
  return (
    <div style={{ maxWidth: 400, padding: 40, margin: 'auto' }}>
      <Text size="sm" my="xs">
        Multiple-select (loop: true)
      </Text>
      <Composite
        type="VerticalListbox"
        items={items}
        focusOptions={{
          loop: true,
        }}
        selectionOptions={false}
        expansionOptions={false}
        renderItem={renderItem}
        className={classes['simple-listbox']}
      />
    </div>
  );
}

export function BasicLayoutGrid() {
  return (
    <div style={{ maxWidth: 400, padding: 40, margin: 'auto' }}>
      <Text size="md" my="xs">
        Single-select
      </Text>
      <Composite
        type="LayoutGrid"
        items={items}
        selectionOptions={{ multiple: true }}
        focusOptions={{ loop: false }}
        renderRoot={({ role, ...props }) => (
          <div role={role}>
            <div
              {...props}
              role="row"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
              }}
            />
          </div>
        )}
        renderItem={renderItem}
      />
    </div>
  );
}

export function ControlledGrid() {
  const [selections, setSelections] = useState<SelectionState>({ selected: new Set() });
  const { selected } = selections;

  return (
    <div style={{ padding: 40, margin: 'auto' }}>
      <Text size="md" my="xs">
        Multiple-select
      </Text>
      <Composite
        type="LayoutGrid"
        items={items}
        selectionState={selections}
        onSelectionChange={setSelections}
        selectionOptions={{
          multiple: true,
        }}
        renderRoot={({ role, ...props }) => (
          <div role={role}>
            <div
              {...props}
              role="row"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(20rem, auto))',
              }}
            />
          </div>
        )}
        renderItem={renderItem}
      />
      <Text size="sm" my="xs">
        Selected: {JSON.stringify([...selected], null, 2)}
      </Text>
    </div>
  );
}
