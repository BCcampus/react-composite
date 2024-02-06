import { AriaRole, Key, MouseEvent, ReactElement } from 'react';
import { BoxProps } from '@mantine/core';
import type { FocusOptions } from './FocusManager/FocusManager.types';
import { SelectionOptions } from './SelectionManager/SelectionManager';

export type CompositeRole = 'listbox' | 'grid' | 'tree' | 'treegrid';
export type CompositeChildRole = 'option' | 'gridcell' | 'treeitem' | 'row';

export interface CompositeChildRenderProps {
  key: Key;
  role: AriaRole;
  'data-item-key': string;
  'aria-selected'?: boolean;
  'aria-disabled'?: boolean;
  className?: string;
  onMouseDown?: (event: MouseEvent<HTMLElement>) => void;
}
export interface CompositeItemRenderStates {
  selected: boolean;
  disabled: boolean;
}

export type CompositeItemRenderFn<T> = (
  item: T,
  states: CompositeItemRenderStates,
  props: CompositeChildRenderProps,
  index: number
) => ReactElement;

export interface CompositeChildProps<T = any>
  extends Partial<CompositeItemRenderStates>,
    Partial<CompositeChildRenderProps> {
  item: T;
  index?: number;
}

export interface CompositeSelectionState {
  /** Selected keys for controlled state */
  value?: Key[];

  /** Initial selected keys for uncontrolled state */
  defaultValue?: Key[];

  /** Controlled state onChange handler */
  onChange?: (value: Key[]) => void;
}

export interface CompositeBaseProps<T> extends BoxProps, CompositeSelectionState {
  /** Element id; auto generated by default */
  id?: string;
  /** Render function for focusable elements like list items and grid cells */
  renderItem: CompositeItemRenderFn<T>;
  /** Data to render */
  items: T[];
  /** Function to get item key. Default: (item: any) => (item.id ?? item.key) */
  getItemKey?: (item: T) => Key;
  /** Disabled keys */
  disabledKeys?: Key[];
  /** Default: { pageSize: 5, loop: false, moveToNextColumn: false, moveToNextRow: false } */
  focusOptions?: FocusOptions;
  /** Default: { multiple: false, followFocus: false, trackSelectioMode: false } */
  selectionOptions?: SelectionOptions;
}

export interface CompositeListboxProps {
  role: 'listbox';
  navigableChildRole: 'option';
}

export interface CompositeGridProps {
  role: 'grid' | 'treegrid';
  navigableChildRole: 'row' | 'gridcell';
}

export interface CompositeTreeProps {
  role: 'tree';
  navigableChildRole: 'treeitem';
}

export type CompositeProps<T> = CompositeBaseProps<T> &
  (CompositeListboxProps | CompositeGridProps | CompositeTreeProps);

export interface CompositeContextValue {
  multiple: boolean;
  selectionMode: boolean;
}