import React, { Key, memo, useMemo, useState } from 'react';
import { MantineDemo } from '@mantinex/demo';
import {
  IconSquare,
  IconSquareCheck,
  IconSquareDot,
  IconCircle,
  IconCircleDot,
  IconCircleCheck,
  IconChevronRight,
  IconChevronDown,
  IconLoader,
} from '@tabler/icons-react';
import { Group, Paper, Text } from '@mantine/core';
import { Composite, useCompositeContext } from '@bccampus/react-composite';
import type {
  CompositeItemProps,
  CompositeItemRenderer,
  SelectionState,
  FocusOptions,
  SelectionOptions,
  ExpansionOptions,
  CompositeItemSelectionProps,
  CompositeItemExpansionProps,
} from '@bccampus/react-composite';

import { Section, book } from './_data_book';

import classes from './Composite.demo.TreeView.module.css';

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
      return null;
    }, [expansionState]);

    const selectionIcon = useMemo(() => {
      if (selected === undefined) return null;

      let SelectionIcon;
      if (ctx.selection && ctx.selection.multiple) {
        SelectionIcon = selected ? IconSquareCheck : selected === null ? IconSquareDot : IconSquare;
      } else {
        SelectionIcon = selected ? IconCircleCheck : selected === null ? IconCircleDot : IconCircle;
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
  <TreeItem {...props} {...states} className={classes.DemoTreeViewGroup} />
);

const renderGroup: CompositeItemRenderer<Section> = ({ children, ...props }, states) => (
  <TreeItem {...props} {...states} className={classes.DemoTreeViewItem}>
    <div role="group">{children}</div>
  </TreeItem>
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

const TreeView = () => {
  const [selections, setSelections] = useState<SelectionState>({ selected: new Set() });
  const [expansions, setExpansions] = useState<Set<Key>>(new Set([40]));

  return (
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
      renderRoot={({ children, ...props }) => (
        <Paper {...props} w="30rem" my="sm" p="sm" shadow="sm" withBorder>
          <Text size="lg" fw={500}>
            {book.title}
          </Text>
          {children}
        </Paper>
      )}
      renderGroup={renderGroup}
      renderItem={renderItem}
    />
  );
};

const cellCode = `
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
  renderRoot={({ children, ...props }) => (
    <Paper {...props} w="30rem" my="sm" p="sm" shadow="sm" withBorder>
      <Text size="lg" fw={500}>
        {book.title}
      </Text>
      {children}
    </Paper>
  )}
  renderGroup={renderGroup}
  renderItem={renderItem}
/>`;

export const treeView: MantineDemo = {
  type: 'code',
  component: TreeView,
  code: [
    {
      code: cellCode,
      language: 'tsx',
      fileName: 'TreeView',
    },
  ],
  centered: true,
  withPadding: false,
};
