import type { KeyboardEvent } from 'react';
import { AbstractEventHandler } from './AbstractEventHandler';

export class HorizontalListEventHandler extends AbstractEventHandler {
  goLeft(from: number) {
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

  goRight(from: number) {
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

  goFirst() {
    return this._focusManager.isFocusableItemIndex(0) ? 0 : this.goRight(0);
  }

  goLast() {
    return this._focusManager.isFocusableItemIndex(this._focusManager.lastItemIndex)
      ? this._focusManager.lastItemIndex
      : this.goLeft(this._focusManager.lastItemIndex);
  }

  keyboardEventHandler(event: KeyboardEvent) {
    let nextIndex = this._focusManager.focused.index;

    if (event.key === 'ArrowLeft') {
      nextIndex = this.goLeft(nextIndex);
    } else if (event.key === 'ArrowRight') {
      nextIndex = this.goRight(nextIndex);
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
