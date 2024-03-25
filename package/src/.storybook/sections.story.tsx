import React from 'react';
import { IconCheck } from '@tabler/icons-react';
import { Flex, Group, Text } from '@mantine/core';
import { Composite } from '../Composite';
import { CompositeItemRenderer } from '../Composite.types';

import './main.module.css';

export default { title: 'Composite' };

interface StoryItem {
  id: number;
  label: string;
  children?: StoryItem[];
}
const items: StoryItem[] = [
  {
    id: 1,
    label: 'Section A',
    children: [
      { id: 11, label: 'Item A.1' },
      { id: 12, label: 'Item A.2' },
      { id: 13, label: 'Item A.3' },
    ],
  },
  {
    id: 2,
    label: 'Section B',
    children: [
      { id: 21, label: 'Item B.1' },
      { id: 22, label: 'Item B.2' },
    ],
  },
  {
    id: 3,
    label: 'Section C',
    children: [
      { id: 31, label: 'Item C.1' },
      { id: 32, label: 'Item C.2' },
      { id: 33, label: 'Item C.3' },
      { id: 34, label: 'Item C.4' },
    ],
  },
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

const renderGroup: CompositeItemRenderer<StoryItem> = (
  { item, children, ...props },
  { selected, onSelectMouseEventHandler, onExpandMouseEventHandler }
) => (
  <Flex gap="xs" {...props} direction="column">
    <Group onClickCapture={onSelectMouseEventHandler} onMouseUp={onExpandMouseEventHandler}>
      <Text>{item.label}</Text>
      {selected && <IconCheck size="1rem" />}
    </Group>
    {children}
  </Flex>
);

export function Sections() {
  return (
    <div style={{ padding: 40, margin: 'auto' }}>
      <Text size="sm" my="xs">
        Multiple-select (loop: true)
      </Text>
      <Composite
        type="VerticalListbox"
        items={items}
        // disabledKeys={[32, 33]}
        focusOptions={{
          loop: true,
          includeDisabledItems: true,
          initialFocusTarget: 'SelectedItem',
        }}
        selectionOptions={{
          multiple: true,
        }}
        expansionOptions={false}
        renderRoot={(props) => <Flex p="sm" {...props} direction="column" />}
        renderItem={renderItem}
        renderGroup={renderGroup}
      />
    </div>
  );
}
