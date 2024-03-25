import type { RefObject, Key, KeyboardEvent, MouseEvent } from 'react';
import type {
  CompositeItemMeta,
  FocusOptions,
  CompositeType,
  CompositeRoles,
} from '../Composite.types';

import { DisabledEventHandler } from './EventHandlers/DisabledEventHandler';
import { AbstractEventHandler } from './EventHandlers/AbstractEventHandler';
import { HorizontalListEventHandler } from './EventHandlers/HorizontalListEventHandler';
import { LayoutGridEventHandler } from './EventHandlers/LayoutGridEventHandler';
import { VerticalListEventHandler } from './EventHandlers/VerticalListEventHandler';
import { TreeViewEventHandler } from './EventHandlers/TreeViewEventHandler';
import { TypeaheadHelper } from './TypeaheadHelper';

const navigableSelector = 'a,button,input,textarea,select,details,[tabindex]';

const patternRoles: Record<CompositeType, CompositeRoles> = {
  VerticalListbox: { root: 'listbox', group: 'group', item: 'option' },
  HorizontalListbox: { root: 'listbox', group: 'group', item: 'option' },
  LayoutGrid: { root: 'grid', group: 'row', item: 'gridcell' },
  DataGrid: { root: 'grid', group: 'rowgroup', item: 'row' },
  TreeView: { root: 'tree', group: 'treeitem', item: 'treeitem' },
  TreeGrid: { root: 'treegrid', group: 'rowgroup', item: 'row' },
};

export class FocusManager {
  private ref: RefObject<HTMLElement>;
  get root() {
    return this.ref.current;
  }

  private _itemSelectors: string[] = [];
  get itemSelectors() {
    return this._itemSelectors;
  }
  private _items: NodeListOf<HTMLElement> | undefined = undefined;
  get items() {
    return this._items;
  }
  get itemCount() {
    return this._items?.length ?? 0;
  }

  private _lastItemIndex: number = 0;
  get lastItemIndex() {
    return this._lastItemIndex;
  }

  private _area = { cols: 0, rows: 0 };
  get area() {
    return this._area;
  }

  private _type: CompositeType;
  get type() {
    return this._type;
  }

  private _roles: CompositeRoles;
  get roles() {
    return this._roles;
  }

  private _prevFocusedIndex: number = -1;
  get prevFocusedIndex() {
    return this._prevFocusedIndex;
  }

  private _firstFocusable: CompositeItemMeta | undefined = undefined;
  get firstFocusable() {
    return this._firstFocusable;
  }

  private _focused: CompositeItemMeta = { element: undefined, index: -1, row: 0, col: 0 };
  get focused() {
    return this._focused;
  }

  private _options: Required<FocusOptions>;
  get options() {
    return this._options;
  }

  private _eventHandler: AbstractEventHandler | undefined;
  private _typeahead: TypeaheadHelper;

  constructor(ref: RefObject<HTMLElement>, pattern: CompositeType, options: FocusOptions) {
    this.ref = ref;
    this._type = pattern;
    this._roles = patternRoles[this._type];

    this._options = {
      pageSize: 5,
      loop: false,
      moveToNextColumn: false,
      moveToNextRow: false,
      includeGroups: false,
      includeDisabledItems: false,
      typeaheadSearchDelay: 100,
      typeaheadResetDelay: 250,
      initialFocusTarget: 'SelectedItem',
      ...options,
    };

    this._typeahead = new TypeaheadHelper(this, {
      typeaheadResetDelay: this._options.typeaheadResetDelay,
      typeaheadSearchDelay: this._options.typeaheadSearchDelay,
    });
    this._itemSelectors = [`[role='${this._roles.item}']`];

    if (this._options.includeGroups === true) {
      this._itemSelectors.push(`[role='${this._roles.group}']`);
    }
  }

  init() {
    if (this.ref.current) {
      this.ref.current.tabIndex = -1;
      this.removeItemChildrenFromTabOrder();

      this._items = this.getCompositeItems();

      if (this._items.length > 0) {
        this._lastItemIndex = this._items.length - 1;

        if (this._roles.root === 'grid' || this._roles.root === 'treegrid') {
          this.calculateGridShape();
        }
      }

      if (this.items) {
        this._firstFocusable = this.findFirstFocusable();
        if (this._focused.element) {
          // Restore the focus
          const newIndex = this.getItemIndex(this._focused.element);
          this.focusAt(newIndex);
        } else this.setInitialFocus(true);

        if (this.type === 'LayoutGrid') {
          this._eventHandler = new LayoutGridEventHandler(this);
        } else if (this.type === 'TreeView') {
          this._eventHandler = new TreeViewEventHandler(this);
        } else if (this.type === 'HorizontalListbox') {
          this._eventHandler = new HorizontalListEventHandler(this);
        } else if (this.type === 'VerticalListbox') {
          this._eventHandler = new VerticalListEventHandler(this);
        } else {
          this._eventHandler = new DisabledEventHandler(this);
        }
      } else {
        if (this.root) this.root.tabIndex = 0;
        this._eventHandler = new DisabledEventHandler(this);
      }
    }
  }

  private getCompositeItems(): NodeListOf<HTMLElement> {
    return this.ref.current.querySelectorAll(this._itemSelectors.join(','));
  }

  /**
   * Removes navigable children of composite items from tab order
   */
  private removeItemChildrenFromTabOrder() {
    this.ref.current.querySelectorAll(navigableSelector).forEach((el) => {
      el.setAttribute('tabindex', '-1');
    });
  }

  isFocusableItem(item?: HTMLElement) {
    if (!item) return false;
    return (
      (this._options.includeDisabledItems || item.ariaDisabled !== 'true') &&
      item.ariaHidden !== 'true'
    );
  }

  isFocusableItemIndex(index: number) {
    return this.isFocusableItem(this.items?.[index]);
  }

  private calculateGridShape() {
    if (this._items && this._items.length > 0) {
      const refRect = this._items[0].getBoundingClientRect();
      const refRectTop = Math.floor(refRect.top + (refRect.bottom - refRect.top) / 2);
      let refRectLeft = Math.floor(refRect.left + (refRect.right - refRect.left) / 2);

      this._area = { cols: 1, rows: 1 };
      for (let index = 1; index < this._items.length; index += 1) {
        const rect = this._items[index].getBoundingClientRect();
        const rectTop = Math.floor(rect.top + (rect.bottom - rect.top) / 2);
        const rectLeft = Math.floor(rect.left + (rect.right - rect.left) / 2);

        if (rectTop === refRectTop && rectLeft !== refRectLeft) {
          this._area.cols += 1;
          refRectLeft = rectLeft;
        } else if (rectTop !== refRectTop) break;
      }
      this._area.rows = Math.ceil(this._items.length / this._area.cols);
    }
  }

  getItemKey(el: HTMLElement) {
    const _key = el?.dataset.itemKey;

    if (_key === undefined) throw new Error('Undefined item key.');

    return JSON.parse(_key) as Key;
  }

  getItemPath(el: HTMLElement) {
    const _path = el?.dataset.itemPath;

    return _path ? (JSON.parse(_path) as number[]) : undefined;
  }

  getItemKeyAt(index: number) {
    return this.getItemKey(this._items?.[index]);
  }

  getItemAt(index: number): CompositeItemMeta {
    return {
      element: this._items?.[index],
      index,
      row: this._area.cols > 0 ? 1 + Math.floor(index / this._area.cols) : 0,
      col: this._area.cols > 0 ? 1 + (index % this._area.cols) : 0,
    };
  }

  getItemByKey(key: Key): HTMLElement {
    return this.root.querySelector(`[data-item-key='${JSON.stringify(key)}']`);
  }

  getItemIndex(el: HTMLElement) {
    if (!el) return undefined;

    if (this._items) {
      for (let i = 0; i <= this._lastItemIndex; i += 1) {
        if (this._items[i] === el) {
          return i;
        }
      }
    }

    return undefined;
  }

  hasCompositeRole(item: Element) {
    return item.role === this._roles.item || item.role === this._roles.group;
  }

  getLabelAt(index: number) {
    let label = this.items[index].innerText?.trim();
    if (label) return label;

    label = this.items[index].ariaLabel?.trim();
    if (label) return label;

    label = this.items[index].title?.trim();
    if (label) return label;

    return null;
  }

  findFirstFocusable() {
    if (this.items) {
      for (let i = 0; i < this.items.length; i += 1) {
        if (this.isFocusableItemIndex(i)) {
          return this.getItemAt(i);
        }
      }
    }

    return undefined;
  }

  setInitialFocus(silent: boolean = false) {
    if (this._firstFocusable?.element) {
      this.focusAt(this._firstFocusable.index, silent);
    } else if (this.root) {
      this.root.tabIndex = 0;
    }
  }

  getParent = (el: HTMLElement, traversalDepth: number = 10): HTMLElement | undefined => {
    let item = el.parentElement;
    while (traversalDepth > 0) {
      if (!this.root.contains(item)) return undefined;
      if (this.hasCompositeRole(item)) return item;
      item = item.parentElement;
      traversalDepth -= 1;
    }

    return undefined;
  };

  getAncestors = (el: HTMLElement): HTMLElement[] => {
    const parents: HTMLElement[] = [];
    let item = this.getParent(el);
    while (item) {
      if (!this.root.contains(item)) break;
      else parents.push(item);

      item = this.getParent(item);
    }

    return parents;
  };

  getSiblings(el: HTMLElement) {
    const siblings: HTMLElement[] = [];
    let sibling = el.parentElement.firstElementChild;
    while (sibling) {
      if (sibling !== el && this.hasCompositeRole(sibling)) siblings.push(sibling as HTMLElement);
      sibling = sibling.nextElementSibling;
    }

    return siblings;
  }

  getChildren(el: HTMLElement) {
    const selector = this._itemSelectors.join(',');
    const children = el.querySelectorAll<HTMLElement>(selector);

    return children;
  }

  focus(el: HTMLElement) {
    const current = this.getItemIndex(el);

    if (current !== undefined) return this.focusAt(current);

    return false;
  }

  focusAt(index: number, silent: boolean = false) {
    if (this.items && this.isFocusableItemIndex(index)) {
      if (this._focused.index > -1 && this.items[this._focused.index]) {
        this.items[this._focused.index].tabIndex = -1;
      }
      this._prevFocusedIndex = this._focused.index;

      this._focused = this.getItemAt(index);
      this._focused.element.tabIndex = 0;
      if (silent === false) this._focused.element.focus();

      return true;
    }
    return false;
  }

  focusTypeaheadMatch(char: string) {
    this._typeahead.focus(char, this.focused.index);
  }

  keyboardEventHandler(event: KeyboardEvent) {
    return this._eventHandler.keyboardEventHandler(event);
  }

  mouseEventHandler(event: MouseEvent) {
    return this._eventHandler.mouseEventHandler(event);
  }
}
