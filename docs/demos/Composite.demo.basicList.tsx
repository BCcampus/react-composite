import React from 'react';
import { Group, Paper, Text } from '@mantine/core';
import { Composite, FocusOptions, SelectionOptions } from '@bccampus/react-composite';
import { MantineDemo } from '@mantinex/demo';
import { IconSquareCheck, IconSquare } from '@tabler/icons-react';
import { people } from './_data';
import classes from './Composite.demo.module.css';

const focusOptions: FocusOptions = { loop: true };
const selectionOptions: SelectionOptions = { multiple: true };
const disabledKeys = [3, 4];
const defaultSelectedKeys = new Set([1, 8]);
function Demo() {
  return (
    <Composite
      type="VerticalListbox"
      items={people}
      defaultSelectionState={{ selected: defaultSelectedKeys }}
      disabledKeys={disabledKeys}
      focusOptions={focusOptions}
      selectionOptions={selectionOptions}
      renderItem={({ item, ...props }, { selected, onSelectMouseEventHandler }) => (
        <Paper {...props} withBorder p="xs" my="xs" miw="15rem" className={classes.compositeItem}>
          <Group>
            <div onClickCapture={onSelectMouseEventHandler}>
              {selected ? <IconSquareCheck /> : <IconSquare />}
            </div>
            <div>
              <Text fw={500}>{item.fullname}</Text>
              <Text size="sm" c="dimmed">
                {item.title}
              </Text>
            </div>
          </Group>
        </Paper>
      )}
    />
  );
}

const cellCode = `
<Composite
  role="listbox"
  navigableChildRole="option"
  items={people}
  defaultValue={[1, 8]}
  disabledKeys={[4, 5]}
  focusOptions={{ loop: true }}
  selectionOptions={{ multiple: true }}
  renderItem={(item: PersonProfile, { selected, disabled }, props) => (
    <Paper {...props} withBorder p="xs" my="xs" miw="15rem" className={classes.compositeItem}>
      <Checkbox
        checked={selected}
        disabled={disabled}
        label={item.fullname}
        description={item.title}
      />
    </Paper>
  )}
/>
`;
const cssCode = `
.compositeItem {
  &:focus-visible {
    outline: 0.125rem solid var(--mantine-primary-color-filled-hover);
  }
}
`;

const sampleData = `
const people: PersonProfile[] = [
  {
    id: 1,
    title: 'Software Developer',
    fullname: 'Kim Tornado',
    bio: 'Passionate about creating efficient and scalable software solutions. Experienced in full-stack development with a focus on web applications. Enjoys tackling complex coding challenges and learning new technologies.',
    image: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png',
  },
  // ...
]
`;

export const basicList: MantineDemo = {
  type: 'code',
  component: Demo,
  code: [
    {
      code: cellCode,
      language: 'tsx',
      fileName: 'basicList.tsx',
    },
    {
      code: cssCode,
      language: 'scss',
      fileName: 'demo.module.css',
    },
    {
      code: sampleData,
      language: 'tsx',
      fileName: 'Sample data',
    },
  ],
  centered: true,
  withPadding: false,
};
