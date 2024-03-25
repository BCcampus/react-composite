import React, { Key, memo, useMemo, useState } from 'react';
import {
  IconSquare,
  IconSquareCheck,
  IconSquareDot,
  IconCircle,
  IconCircleCheck,
  IconChevronRight,
  IconChevronDown,
  IconLoader,
} from '@tabler/icons-react';
import { Button, Group, Paper, Text } from '@mantine/core';
import { Composite, useCompositeContext } from '../Composite.tsx';
import {
  CompositeItemProps,
  CompositeItemRenderer,
  SelectionState,
  FocusOptions,
  SelectionOptions,
  ExpansionOptions,
  CompositeItemSelectionProps,
  CompositeItemExpansionProps,
} from '../Composite.types.ts';

import { Book, Section, book } from './_data_book.ts';

import './main.module.css';

export default { title: 'Composite' };

const TreeItem = memo(
  ({
    item,

    selected,
    onSelectMouseEventHandler: onSelect,

    expansionState,
    onExpandMouseEventHandler: onExpand,

    children,
    ...props
  }: CompositeItemProps<Section> & CompositeItemSelectionProps & CompositeItemExpansionProps) => {
    const ctx = useCompositeContext();

    const expansionIcon = useMemo(() => {
      switch (expansionState) {
        case 'None':
          return <div style={{ width: '1rem' }} />;
        case 'Collapsed':
          return <IconChevronRight size="1rem" onClickCapture={onExpand} />;
        case 'Expanding':
          return <IconLoader size="1rem" />;
        case 'Expanded':
          return <IconChevronDown size="1rem" onClickCapture={onExpand} />;
      }
    }, [expansionState]);

    const selectionIcon = useMemo(() => {
      if (selected === undefined) return null;

      let SelectionIcon;
      if (ctx.selection && ctx.selection.multiple) {
        SelectionIcon = selected ? IconSquareCheck : selected === null ? IconSquareDot : IconSquare;
      } else {
        SelectionIcon = selected ? IconCircleCheck : IconCircle;
      }

      return <SelectionIcon size="1rem" onClickCapture={onSelect} />;
    }, [selected, ctx]);

    return (
      <div {...props}>
        <Group gap="0.5rem" wrap="nowrap">
          {expansionIcon}
          {selectionIcon}
          <Text fw={500} truncate title={item.title}>
            {item.levelNumbering} {item.title}
          </Text>
        </Group>

        {children}
      </div>
    );
  }
);

const renderItem: CompositeItemRenderer<Section> = (props, states) => (
  <TreeItem {...props} {...states} />
);

const renderGroup: CompositeItemRenderer<Section> = ({ children, ...props }, states) => (
  <TreeItem {...props} {...states}>
    <div role="group">{children}</div>
  </TreeItem>
);

const renderRoot = ({ children, ...props }) => (
  <Paper {...props} w="30rem" my="sm" p="sm" shadow="sm" withBorder>
    <Text size="lg" fw={500}>
      {book.title}
    </Text>
    {children}
  </Paper>
);

const focusOptions: FocusOptions = { loop: false, includeGroups: true, includeDisabledItems: true };
const selectionOptions: SelectionOptions = {
  multiple: false,
  allowGroupSelection: true,
  makeInferredSelection: true,
};
const expansionOptions: ExpansionOptions = {
  multiple: true,
};
const disabledKeys = [2, 1500];

export const TreeView = () => {
  const [selections, setSelections] = useState<SelectionState>({ selected: new Set() });
  const [expansions, setExpansions] = useState<Set<Key>>(new Set([40]));

  return (
    <div>
      <Composite
        type="TreeView"
        items={book.content}
        getChildren={(item) => item.sections}
        focusOptions={focusOptions}
        disabledKeys={disabledKeys}
        selectionOptions={selectionOptions}
        selectionState={selections}
        onSelectionChange={setSelections}
        expansionOptions={expansionOptions}
        expandedKeys={expansions}
        onExpansionChange={setExpansions}
        renderRoot={renderRoot}
        renderGroup={renderGroup}
        renderItem={renderItem}
      />
      <Text size="sm" my="xs">
        Selected:
      </Text>
      <code>
        {JSON.stringify(selections, (key, value) => (value instanceof Set ? [...value] : value), 2)}
      </code>
    </div>
  );
};
