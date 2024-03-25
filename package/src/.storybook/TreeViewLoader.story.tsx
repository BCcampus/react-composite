import React, { Key, memo, startTransition, useMemo, useState } from 'react';
import { flushSync } from 'react-dom';
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
import { Composite, useCompositeContext } from '../Composite';
import {
  CompositeItemProps,
  CompositeItemRenderer,
  SelectionState,
  FocusOptions,
  SelectionOptions,
  ExpansionOptions,
  CompositeItemSelectionProps,
  CompositeItemExpansionProps,
} from '../Composite.types';

import './main.module.css';

export default { title: 'Composite' };

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

interface ResourceInternal {
  __childrenLoading?: boolean;
  __childrenLoadedAt?: number;
}

interface Resource {
  id: number;
  resourceId: number;
  title: string;
  children?: Resource[];
  isAtomic?: boolean;
}

const items: (Resource & ResourceInternal)[] = [
  {
    id: 1,
    resourceId: 1,
    title: 'Course Pack A',
    children: [
      {
        id: 2,
        resourceId: 101,
        title: 'Module A.1',
        isAtomic: false,
      },
      {
        id: 3,
        resourceId: 102,
        title: 'Module A.2',
        isAtomic: false,
      },
    ],
  },
  {
    id: 6,
    resourceId: 2,
    title: 'Course Pack B',
    children: [
      {
        id: 7,
        resourceId: 201,
        title: 'Module B.1',
        isAtomic: false,
      },
      {
        id: 8,
        resourceId: 202,
        title: 'Module B.2',
        children: [
          {
            id: 9,
            resourceId: 1022,
            title: 'Book 2',
          },
        ],
      },
      {
        id: 10,
        resourceId: 203,
        title: 'Module B.3',
        isAtomic: false,
      },
      {
        id: 11,
        resourceId: 204,
        title: 'Module B.4',
      },
      {
        id: 12,
        resourceId: 205,
        title: 'Module B.5',
      },
    ],
  },
  {
    id: 13,
    resourceId: 1021,
    title: 'Book 1',
    isAtomic: false,
  },
  {
    id: 14,
    resourceId: 3000,
    title: 'Video Playlist',
    children: [
      {
        id: 15,
        resourceId: 30001,
        title: 'Philosophy',
        children: [
          {
            id: 17,
            resourceId: 30003,
            title: 'Video 1',
          },
          {
            id: 18,
            resourceId: 30004,
            title: 'Video 5',
          },
        ],
      },
      {
        id: 35,
        resourceId: 30001,
        title: 'Physiology 101',
        children: [
          {
            id: 117,
            resourceId: 31003,
            title: 'Video 121',
          },
          {
            id: 128,
            resourceId: 31004,
            title: 'Video 52',
          },
        ],
      },
      {
        id: 16,
        resourceId: 30002,
        title: 'Psychology 101',
        children: [
          {
            id: 19,
            resourceId: 30005,
            title: 'Video 2',
          },
          {
            id: 20,
            resourceId: 30006,
            title: 'Psychiatry in a Nutshell',
            children: [
              {
                id: 21,
                resourceId: 30021,
                title: 'Video 21',
                children: [
                  {
                    id: 22,
                    resourceId: 30022,
                    title: 'Video 22',
                    isAtomic: false,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

const TreeItem = memo(
  ({
    item,

    selected,
    onSelectMouseEventHandler: onSelect,

    expansionState,
    onExpandMouseEventHandler: onExpand,

    children,
    ...props
  }: CompositeItemProps<Resource> & CompositeItemSelectionProps & CompositeItemExpansionProps) => {
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
          <Text>
            ({item.id}) {item.title}
          </Text>
        </Group>

        {children}
      </div>
    );
  }
);

const renderItem: CompositeItemRenderer<Resource> = (props, states) => (
  <TreeItem {...props} {...states} />
);

const renderGroup: CompositeItemRenderer<Resource> = ({ children, ...props }, states) => (
  <TreeItem {...props} {...states}>
    <div role="group">{children}</div>
  </TreeItem>
);

const renderRoot = (props) => (
  <Paper {...props} direction="column" w="50rem" my="sm" p="sm" shadow="sm" withBorder />
);

const mockResourceTypes = [
  { name: 'Course Pack', isAtomic: false },
  { name: 'Module', isAtomic: false },
  { name: 'Lesson', isAtomic: false },
  { name: 'Unit', isAtomic: false },
  // { name: 'Presentation', isAtomic: true },
  // { name: 'Guide', isAtomic: true },
  // { name: 'Textbook', isAtomic: true },
  // { name: 'Webinar', isAtomic: true },
  // { name: 'Syllabus', isAtomic: true },
];

const mockTreeItems = (n: number, path: number[]) => {
  const mock: Resource[] = [];
  const parthId = path.reduce((sum, curr, i) => sum + Math.pow(10, i) + curr, 1000);
  for (let i = 0; i < n; i += 1) {
    const type = mockResourceTypes[Math.floor(Math.random() * mockResourceTypes.length)];
    mock.push({
      id: parthId + i,
      resourceId: Date.now() + i,
      title: `${type.name} ${path.join('.')}.${i}`,
      isAtomic: type.isAtomic,
    });
  }

  return mock;
};

// const focusOptions: FocusOptions = { loop: false };
// const selectionOptions: SelectionOptions = {
//   multiple: false,
//   followFocus: true,
//   trackSelectioMode: true,
// };
const disabledKeys = [6];

export const TreeViewLoader = () => {
  const [data, setData] = useState(items);
  const [selections, setSelections] = useState<SelectionState>({ selected: new Set() });
  const [expansions, setExpansions] = useState<Set<Key>>(new Set([1, 2, 1011, 1111]));
  const [focusOptions, setFocusOptions] = useState<FocusOptions>({
    loop: false,
    includeGroups: true,
    includeDisabledItems: true,
  });
  const [selectionOptions, setSelectionOptions] = useState<SelectionOptions>({
    multiple: true,
    followFocus: true,
    trackSelectioMode: true,
    allowGroupSelection: true,
    makeInferredSelection: true,
  });

  const expansionOptions: ExpansionOptions = useMemo(
    () => ({
      multiple: true,
      // defaultExpanded: true,
      beforeExpand: async (key, path) => {
        let item = data.at(path[0]);
        for (let i = 1; i < path.length; i += 1) {
          item = item!.children!.at(path[i]);
        }

        if (item) {
          if (
            !item.children ||
            item.children?.length === 0 ||
            item.__childrenLoadedAt! < Date.now() - 360000
          ) {
            item.__childrenLoadedAt = Date.now();
            await sleep(Math.random() * 1000);
            flushSync(() => {
              setData((prev) => {
                item!.children = mockTreeItems(1 + Math.random() * 4, path);
                return [...prev];
              });
            });
          }
        }
      },
    }),
    [setData]
  );

  return (
    <div>
      <Group>
        <Button onClick={() => setFocusOptions((prev) => ({ ...prev, loop: !prev.loop }))}>
          Toggle Focus Loop
        </Button>
        <Button
          onClick={() => setSelectionOptions((prev) => ({ ...prev, multiple: !prev.multiple }))}
        >
          Toggle Selection Type
        </Button>
      </Group>

      <Composite
        type="TreeView"
        items={data}
        isContainer={(item) => Array.isArray(item.children) || item.isAtomic === false}
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
      <pre>
        {JSON.stringify(selections, (key, value) => (value instanceof Set ? [...value] : value), 2)}
      </pre>
    </div>
  );
};
