import type { KeyboardEvent } from 'react';

import { AbstractEventHandler } from './AbstractEventHandler';

export class VerticalListEventHandler extends AbstractEventHandler {
  goUp(from: number) {
    let nextIndex = from;
    do {
      if (nextIndex > 0) {
        nextIndex -= 1;
      } else if (this._focusManager.options.loop) {
        nextIndex = this._focusManager.lastItemIndex;
      } else {
        nextIndex = from;
      }
    } while (from !== nextIndex && !this._focusManager.isFocusableItemIndex(nextIndex));

    return nextIndex;
  }

  goDown(from: number) {
    let nextIndex = from;
    do {
      if (nextIndex < this._focusManager.lastItemIndex) {
        nextIndex += 1;
      } else if (this._focusManager.options.loop) {
        nextIndex = 0;
      } else {
        nextIndex = from;
      }
    } while (from !== nextIndex && !this._focusManager.isFocusableItemIndex(nextIndex));

    return nextIndex;
  }

  jumpUp(from: number, step: number = 1) {
    let nextIndex = from;
    const _nextIndex = from - step;
    if (_nextIndex >= 0) {
      nextIndex = _nextIndex;
    } else {
      nextIndex = 0;
    }

    return this._focusManager.isFocusableItemIndex(nextIndex) ? nextIndex : this.goUp(nextIndex);
  }

  jumpDown(from: number, step: number = 1) {
    let nextIndex = from;
    const _nextIndex = from + step;
    if (_nextIndex <= this._focusManager.lastItemIndex) nextIndex = _nextIndex;
    else nextIndex = this._focusManager.lastItemIndex;

    return this._focusManager.isFocusableItemIndex(nextIndex) ? nextIndex : this.goDown(nextIndex);
  }

  goFirst() {
    return this._focusManager.isFocusableItemIndex(0) ? 0 : this.goDown(0);
  }

  goLast() {
    return this._focusManager.isFocusableItemIndex(this._focusManager.lastItemIndex)
      ? this._focusManager.lastItemIndex
      : this.goUp(this._focusManager.lastItemIndex);
  }

  keyboardEventHandler(event: KeyboardEvent) {
    let nextIndex = this._focusManager.focused.index;

    if (event.key === 'ArrowUp') {
      nextIndex = this.goUp(nextIndex);
    } else if (event.key === 'ArrowDown') {
      nextIndex = this.goDown(nextIndex);
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

    return true;
  }
}
