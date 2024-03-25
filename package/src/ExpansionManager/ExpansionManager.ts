import type { Key, KeyboardEvent, MouseEvent } from 'react';

import type { FocusManager } from '../FocusManager/FocusManager';
import type { ExpansionOptions } from '../Composite.types';
import { ExpansionEventHandler } from './ExpansionEventHandler';
import { range } from '../utils/range/range';

type OnChangeCallback = (state: Set<Key>) => void;

interface ExpansionManagerParams {
  focusManager: FocusManager;
  initialState?: Set<Key>;
  setExpandedKeys: OnChangeCallback;
  options?: ExpansionOptions;
  setExpandingKeys: OnChangeCallback;
}

export class ExpansionManager {
  private _focusManager: FocusManager;

  private _options: Required<ExpansionOptions>;
  get options() {
    return this._options;
  }

  get multiple() {
    return this._options.multiple ?? false;
  }

  private _setExpandedKeys: OnChangeCallback;
  private _expandingKeys: Set<Key>;
  get expandingKeys() {
    return this._expandingKeys;
  }

  private _setExpandingKeys: OnChangeCallback;
  private _expandedKeys: Set<Key>;
  get expandedKeys() {
    return this._expandedKeys;
  }

  private _itemCount: number = 0;
  private _eventHandler: ExpansionEventHandler;

  private _hasWatingEvents: boolean = false;

  constructor(params: ExpansionManagerParams) {
    this._focusManager = params.focusManager;
    this._setExpandedKeys = params.setExpandedKeys;
    this._setExpandingKeys = params.setExpandingKeys;

    this._options = {
      multiple: false,
      defaultExpanded: false,
      beforeExpand: undefined,
      afterExpand: undefined,
      ...params.options,
    };

    this._expandedKeys = new Set(params.initialState);
    this._expandingKeys = new Set();

    if (this._expandedKeys.size > 0) {
      this._hasWatingEvents = true;
    }

    this._eventHandler = new ExpansionEventHandler(this._focusManager, this);
  }

  init() {
    this._itemCount = 0;
    this._focusManager.items.forEach((item) => {
      if (this.isExpandableItem(item) || this.isCollapsibleItem(item)) {
        this._itemCount += 1;
      }
    });
    this.fireWaitingEvents();
  }

  isExpandableItem(item?: HTMLElement) {
    if (!item || item.ariaDisabled === 'true') return false;
    return item.ariaExpanded === 'false';
  }

  isExpandableItemIndex(index: number) {
    return this.isExpandableItem(this._focusManager.items?.[index]);
  }

  isCollapsibleItem(item?: HTMLElement) {
    if (!item || item.ariaDisabled === 'true') return false;
    return item.ariaExpanded === 'true';
  }

  isCollapsibleItemIndex(index: number) {
    return this.isCollapsibleItem(this._focusManager.items?.[index]);
  }

  setExpansions(expansions: Set<Key>) {
    this._expandedKeys = new Set(expansions);
  }

  async fireWaitingEvents() {
    if (this._hasWatingEvents) {
      this._hasWatingEvents = false;
      for (const key of this._expandedKeys) {
        const el = this._focusManager.getItemByKey(key);

        if (el) {
          let continueExpand: boolean | void = true;
          if (this._options.beforeExpand) {
            continueExpand = await this._options.beforeExpand(
              key,
              this._focusManager.getItemPath(el)
            );
          }

          if (continueExpand !== false) {
            if (this._options.afterExpand) {
              await this._options.afterExpand(key, this._focusManager.getItemPath(el));
            }
          }
        }
      }
    }
  }

  toggleExpand(el: HTMLElement) {
    const key = this._focusManager.getItemKey(el);
    if (key) {
      if (this._expandedKeys.has(key)) {
        this.collapse(el);
      } else {
        this.expand(el);
      }
    }
  }

  async expand(el: HTMLElement) {
    if (this.isExpandableItem(el)) {
      const key = this._focusManager.getItemKey(el);

      if (key && !this._expandingKeys.has(key) && !this._expandedKeys.has(key)) {
        this._expandingKeys.add(key);
        this._setExpandingKeys(new Set(this._expandingKeys));
        const expandedLevel = Number(el?.ariaLevel ?? 0);

        let continueExpand: boolean | void = true;
        if (this._options.beforeExpand) {
          continueExpand = await this._options.beforeExpand(
            key,
            this._focusManager.getItemPath(el)
          );
        }

        if (continueExpand !== false) {
          if (!this._options.multiple) {
            if (expandedLevel <= this._expandedKeys.size) {
              const newState = [...this._expandedKeys];
              newState.splice(expandedLevel - this._expandedKeys.size - 1, Infinity, key);
              this._expandedKeys = new Set(newState);
            } else {
              this._expandedKeys.add(key);
            }
          } else {
            this._expandedKeys.add(key);
          }

          this._expandingKeys.delete(key);
          this._setExpandedKeys(new Set(this._expandedKeys));
          this._setExpandingKeys(new Set(this._expandingKeys));

          if (this._options.afterExpand) {
            await this._options.afterExpand(key, this._focusManager.getItemPath(el));
          }
        }
      }
    }
  }

  async collapse(el: HTMLElement) {
    if (this.isCollapsibleItem(el)) {
      const key = this._focusManager.getItemKey(el);
      if (key && this._expandedKeys.has(key)) {
        this._expandedKeys.delete(key);

        this._setExpandedKeys(new Set(this._expandedKeys));
      }
    }
  }

  private isAllExpanded() {
    return this._itemCount === this._expandedKeys.size;
  }

  async expandAll() {
    if (this._options.multiple) {
      const expansionRange = range(0, this._focusManager.lastItemIndex);

      for (const index of expansionRange) {
        await this.expand(this._focusManager.items[index]);
      }
    }
  }

  async collapseAll() {
    if (this._options.multiple) {
      const expansionRange = range(0, this._focusManager.lastItemIndex);

      for (const index of expansionRange) {
        await this.collapse(this._focusManager.items[index]);
      }

      if (this._focusManager.focused.element.ariaLevel !== '1') {
        this._focusManager.focusAt(0);
      }
    }
  }

  toggleAll() {
    if (this._options.multiple) {
      if (!this.isAllExpanded()) this.expandAll();
      else this.collapseAll();
    }
  }

  expandSiblings(el: HTMLElement) {
    this.expand(el);

    const siblings = this._focusManager.getSiblings(el);

    siblings.forEach((sibling) => this.expand(sibling));
  }

  keyboardEventHandler(event: KeyboardEvent) {
    return this._eventHandler.keyboardEventHandler(event);
  }

  mouseEventHandler(event: MouseEvent) {
    return this._eventHandler.mouseEventHandler(event);
  }
}
