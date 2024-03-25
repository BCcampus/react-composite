import React, { useState } from 'react';
import { Divider, Flex, Paper, ScrollArea } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';
import { SelectionState } from '@bccampus/react-composite';
import { mantineComponents } from './_data';
import { ComponentCardCell } from './Composite.ComponentCardCell';
import { LayoutGrid } from './Composite.LayoutGrid';

const focusOptions = { loop: true, moveToNextRow: true };
const selectionOptions = { multiple: true };

function Demo() {
  const [selections, setSelections] = useState<SelectionState>({ selected: new Set() });

  return (
    <Flex direction="column">
      <ScrollArea h="30rem">
        <LayoutGrid
          selectionState={selections}
          onSelectionChange={setSelections}
          selectionOptions={selectionOptions}
          focusOptions={focusOptions}
          items={mantineComponents}
          getItemKey={(item) => item.slug}
          renderItem={(itemProps, { selected, onSelectMouseEventHandler }) => (
            <ComponentCardCell
              selected={selected}
              onSelectMouseEventHandler={onSelectMouseEventHandler}
              {...itemProps}
            />
          )}
        />
      </ScrollArea>
      <Divider />
      <Paper p="sm">Selected component: {[...selections.selected].join(', ')}</Paper>
    </Flex>
  );
}

const demoCode = `
const focusOptions = { loop: true, moveToNextRow: true };
const selectionOptions = { multiple: true };

function Demo() {
  const [selections, setSelections] = useState<Key[]>([]);

  return (
    <Flex direction="column">
      <ScrollArea h="30rem">
        <LayoutGrid
          value={selections}
          onChange={setSelections}
          selectionOptions={selectionOptions}
          focusOptions={focusOptions}
          items={mantineComponents}
          getItemKey={(item) => item.slug}
          renderItem={(item, { selected, disabled }, itemProps) => (
            <ComponentCardCell item={item} selected={selected} disabled={disabled} {...itemProps} />
          )}
        />
      </ScrollArea>
      <Divider />
      <Paper p="sm">Selected component: {selections.join(', ')}</Paper>
    </Flex>
  );
}
`;

export const controlledComposite: MantineDemo = {
  type: 'code',
  component: Demo,
  code: demoCode,
  centered: true,
  withPadding: false,
};
