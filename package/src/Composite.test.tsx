import React from 'react';
import { render, tests, screen } from '@mantine-tests/core';
import { Composite, CompositeProps, CompositeItemRenderFn } from '.';

interface TestItem {
  id: number;
  label: string;
}
const items: TestItem[] = [
  { id: 1, label: 'Item 1' },
  { id: 2, label: 'Item 2' },
  { id: 3, label: 'Item 3' },
  { id: 4, label: 'Item 4' },
  { id: 5, label: 'Item 5' },
];

const renderItem: CompositeItemRenderFn<TestItem> = (item, { selected }, props) => (
  <div {...props}>
    {item.label} {selected ? '[SELECTED]' : ''}{' '}
  </div>
);

const defaultProps: CompositeProps<TestItem> = {
  items: [],
  role: 'listbox',
  navigableChildRole: 'option',
  renderItem,
};

describe('@bccampus/mantinex-composite', () => {
  tests.itIsPolymorphic<CompositeProps<TestItem>>({
    component: Composite,
    props: defaultProps,
  });

  it('renders without crashing', () => {
    render(
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
        renderItem={renderItem}
      />
    );
    expect(screen.getByText('Item 1')).toBeInTheDocument();
  });
});
