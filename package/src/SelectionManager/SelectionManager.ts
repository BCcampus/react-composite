import type { Key, KeyboardEvent, MouseEvent } from 'react';
import type { FocusManager } from '../FocusManager/FocusManager';
import type { SelectionState, SelectionOptions } from '../Composite.types';

import { SelectionEventHandler } from './SelectionEventHandler';
import { range } from '../utils/range/range';

type OnChangeCallback = (state: SelectionState) => void;

interface SelectionManagerParams {
  focusManager: FocusManager;
  initialState?: SelectionState;
  setSelectionState: OnChangeCallback;
  options?: SelectionOptions;
}

export class SelectionManager {
  private _focusManager: FocusManager;

  private _selectedKeys: Set<Key>;
  get selectedKeys() {
    return this._selectedKeys;
  }

  private _indeterminateKeys: Set<Key>;
  get indeterminateKeys() {
    return this._indeterminateKeys;
  }

  private _options: Required<SelectionOptions>;
  get options() {
    return this._options;
  }
  get multiple() {
    return this._options.multiple ?? false;
  }

  private _lastSelectionIndex?: number;
  private _setSelectionState: OnChangeCallback;
  private _eventHandler: SelectionEventHandler;

  private _selectableItemCount: number = 0;
  get selectableItemCount() {
    return this._selectableItemCount;
  }

  constructor(params: SelectionManagerParams) {
    this._focusManager = params.focusManager;
    this._setSelectionState = params.setSelectionState;

    this._options = {
      multiple: false,
      followFocus: false,
      trackSelectioMode: false,
      ariaStateAttribute: 'aria-selected',
      makeInferredSelection: false,
      ...params.options,
      allowGroupSelection:
        this._focusManager.options.includeGroups === true &&
        params.options?.allowGroupSelection === true,
    };

    this._selectedKeys = new Set(params.initialState.selected);
    this._indeterminateKeys = new Set();

    this._eventHandler = new SelectionEventHandler(this._focusManager, this._focusManager, this);
  }

  init() {
    this._selectableItemCount = 0;
    this._focusManager.items.forEach((item) => {
      if (this.isSelectableItem(item)) {
        this._selectableItemCount += 1;
      }
    });
  }

  getFirstSelection() {
    return this._focusManager.root.querySelector(`[${this._options.ariaStateAttribute}='true']`);
  }

  isSelectableItem(item?: HTMLElement) {
    if (!item || item.ariaDisabled === 'true') return false;

    return (
      item.getAttribute(this._options.ariaStateAttribute) === 'false' ||
      item.getAttribute(this._options.ariaStateAttribute) === 'true'
    );
  }

  isSelectableItemIndex(index: number) {
    return this.isSelectableItem(this._focusManager.items?.[index]);
  }

  private isAllSelected() {
    return this.selectableItemCount === this._selectedKeys.size;
  }

  setSelections(selections: SelectionState) {
    this._selectedKeys = new Set(selections.selected);
    this._indeterminateKeys = new Set(selections.indeterminate);

    this._lastSelectionIndex = this._focusManager.focused.index;
  }

  private select(el: HTMLElement, indeterminate: boolean = false) {
    if (this.isSelectableItem(el)) {
      const key = this._focusManager.getItemKey(el);

      if (!this._options.multiple) {
        if (!indeterminate) {
          this._selectedKeys = new Set([key]);
          this._indeterminateKeys.delete(key);
        } else {
          this._indeterminateKeys.add(key);
          this._selectedKeys.delete(key);
        }
      } else if (!indeterminate) {
        this._selectedKeys.add(key);
        this._indeterminateKeys.delete(key);
      } else {
        this._indeterminateKeys.add(key);
        this._selectedKeys.delete(key);
      }
      return key;
    }
    return undefined;
  }

  private inferSelect(el: HTMLElement) {
    if (this._options.makeInferredSelection) {
      if (this._options.multiple) {
        const children = this._focusManager.getChildren(el);
        children.forEach((child) => this.select(child));
      }

      const ancestors = this._focusManager.getAncestors(el);
      const predicate = (sibling) => {
        const key = this._focusManager.getItemKey(sibling);
        return this._selectedKeys.has(key);
      };
      let indeterminateParents = false;
      for (let i = 0; i < ancestors.length; i += 1) {
        if (!indeterminateParents) {
          const siblings = this._focusManager.getSiblings(i > 0 ? ancestors[i - 1] : el);
          if (this._options.multiple && siblings.every(predicate)) this.select(ancestors[i]);
          else {
            this.select(ancestors[i], true);
            indeterminateParents = true;
          }
        } else {
          this.select(ancestors[i], true);
        }
      }
    }
  }

  private deselect(el: HTMLElement) {
    if (this.isSelectableItem(el)) {
      const key = this._focusManager.getItemKey(el);
      if (this._options.multiple) {
        this._selectedKeys.delete(key);
        this._indeterminateKeys.delete(key);
        return key;
      }
    }
    return undefined;
  }

  private inferDeselect(el: HTMLElement) {
    if (this._options.makeInferredSelection && this._options.multiple) {
      const children = this._focusManager.getChildren(el);
      children.forEach((child) => this.deselect(child));

      const ancestors = this._focusManager.getAncestors(el);
      const predicate = (sibling) => {
        const key = this._focusManager.getItemKey(sibling);
        return !this._selectedKeys.has(key);
      };
      let indeterminateParents = false;
      for (let i = 0; i < ancestors.length; i += 1) {
        if (!indeterminateParents) {
          const siblings = this._focusManager.getSiblings(i > 0 ? ancestors[i - 1] : el);

          if (siblings.every(predicate)) this.deselect(ancestors[i]);
          else {
            this.select(ancestors[i], true);
            indeterminateParents = true;
          }
        } else {
          this.select(ancestors[i], true);
        }
      }
    }
  }

  toggleSelection(el: HTMLElement) {
    if (this.isSelectableItem(el)) {
      const key = this._focusManager.getItemKey(el);
      if (key) {
        if (this._selectedKeys.has(key)) {
          this.deselect(el);
          this.inferDeselect(el);
          this._lastSelectionIndex = undefined;
        } else {
          if (!this._options.multiple) this._indeterminateKeys = new Set([]);
          this.select(el);
          this.inferSelect(el);
          this._lastSelectionIndex = this._focusManager.getItemIndex(el);
        }

        this._setSelectionState({
          selected: new Set(this._selectedKeys),
          indeterminate: new Set(this._indeterminateKeys),
        });
      }
    }
  }

  selectRange(from?: number) {
    if (!this._options.multiple) {
      this.select(this._focusManager.items[this._focusManager.focused.index]);
    } else {
      const _fromIndex = from ?? this._lastSelectionIndex ?? this._focusManager.focused.index;
      const selectionRange = range(
        Math.max(_fromIndex, this._focusManager.focused.index),
        Math.min(_fromIndex, this._focusManager.focused.index)
      );

      for (const index of selectionRange) {
        this.select(this._focusManager.items[index]);
        this.inferSelect(this._focusManager.items[index]);
      }
    }

    this._lastSelectionIndex = this._focusManager.focused.index;
    this._setSelectionState({
      selected: new Set(this._selectedKeys),
      indeterminate: new Set(this._indeterminateKeys),
    });
  }

  toggleAll() {
    if (this._options.multiple) {
      if (!this.isAllSelected()) {
        const selectionRange = range(0, this._focusManager.lastItemIndex);
        for (const index of selectionRange) {
          this.select(this._focusManager.items[index]);
        }
        this._lastSelectionIndex = this._focusManager.lastItemIndex;
      } else {
        this._lastSelectionIndex = undefined;
        this._selectedKeys = new Set();
        this._indeterminateKeys = new Set();
      }
    }

    this._setSelectionState({
      selected: new Set(this._selectedKeys),
      indeterminate: new Set(this._indeterminateKeys),
    });
  }

  keyboardEventHandler(event: KeyboardEvent) {
    return this._eventHandler.keyboardEventHandler(event);
  }

  mouseEventHandler(event: MouseEvent) {
    return this._eventHandler.mouseEventHandler(event);
  }
}
