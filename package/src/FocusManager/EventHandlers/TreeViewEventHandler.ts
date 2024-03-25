import type { KeyboardEvent } from 'react';

import { VerticalListEventHandler } from './VerticalListEventHandler';

export class TreeViewEventHandler extends VerticalListEventHandler {
  goFirstChild(from: number) {
    const item = this._focusManager.items[from];

    return item.ariaExpanded !== 'true' ? from : this.goDown(from);
  }

  goParent(from: number) {
    const fromItem = this._focusManager.items[from];

    if (fromItem.ariaLevel === '1' || fromItem.ariaExpanded === 'true') {
      return from;
    }

    let nextIndex = this.goUp(from);
    let item = this._focusManager.items[nextIndex];

    while (item.ariaLevel === fromItem.ariaLevel && item.ariaLevel !== '1') {
      nextIndex = this.goUp(nextIndex);
      item = this._focusManager.items[nextIndex];
    }

    return nextIndex;
  }

  keyboardEventHandler(event: KeyboardEvent) {
    let nextIndex = this._focusManager.focused.index;
    let propagate = true;
    if (event.key === 'ArrowUp') {
      nextIndex = this.goUp(nextIndex);
    } else if (event.key === 'ArrowDown') {
      nextIndex = this.goDown(nextIndex);
    } else if (event.key === 'ArrowRight') {
      nextIndex = this.goFirstChild(nextIndex);
      propagate = this._focusManager.focused.index === nextIndex;
    } else if (event.key === 'ArrowLeft') {
      nextIndex = this.goParent(nextIndex);
      propagate = this._focusManager.focused.index === nextIndex;
    } else if (event.key === 'PageUp') {
      nextIndex = this.jumpUp(nextIndex, this._focusManager.options.pageSize);
    } else if (event.key === 'PageDown') {
      nextIndex = this.jumpDown(nextIndex, this._focusManager.options.pageSize);
    } else if (event.key === 'Home') {
      nextIndex = this.goFirst();
    } else if (event.key === 'End') {
      nextIndex = this.goLast();
    }

    if (this._focusManager.focused.index !== nextIndex) {
      event.preventDefault();
      this._focusManager.focusAt(nextIndex);
    } else if (event.key.length === 1 || event.key === 'Backspace') {
      event.preventDefault();
      event.stopPropagation();
      this._focusManager.focusTypeaheadMatch(event.key);
    }

    return propagate;
  }
}
