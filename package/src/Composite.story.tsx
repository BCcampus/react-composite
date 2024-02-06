import React, { Key, useState } from 'react';
import { IconCheck } from '@tabler/icons-react';
import { Flex, Group, Text } from '@mantine/core';
import { Composite } from './Composite';
import { CompositeItemRenderFn } from './Composite.types';

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
];

const renderItem: CompositeItemRenderFn<StoryItem> = (item, { selected }, props) => (
  <div {...props}>
    <Group>
      <Text>{item.label}</Text>
      {selected && <IconCheck size="1rem" />}
    </Group>
  </div>
);

export function Usage() {
  return (
    <div style={{ maxWidth: 400, padding: 40, margin: 'auto' }}>
      <Text size="sm" my="xs">
        Multiple-select (loop: true)
      </Text>
      <Composite
        role="listbox"
        navigableChildRole="option"
        items={items}
        focusOptions={{
          loop: true,
        }}
        selectionOptions={{
          multiple: true,
        }}
        renderRoot={(props) => <Flex {...props} direction="column" />}
        renderItem={renderItem}
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
        role="grid"
        navigableChildRole="gridcell"
        items={items}
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
  const [selections, setSelections] = useState<Key[]>([]);

  return (
    <div style={{ maxWidth: 400, padding: 40, margin: 'auto' }}>
      <Text size="md" my="xs">
        Multiple-select
      </Text>
      <Composite
        role="grid"
        navigableChildRole="gridcell"
        items={items}
        value={selections}
        onChange={setSelections}
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
                gridTemplateColumns: 'repeat(3, 1fr)',
              }}
            />
          </div>
        )}
        renderItem={renderItem}
      />
      <Text size="sm" my="xs">
        Selections: {selections.join(', ')}
      </Text>
    </div>
  );
}
