import type { KeyboardEvent, MouseEvent } from 'react';
import type { FocusManager } from '../FocusManager';

export abstract class AbstractEventHandler {
  protected _focusManager: FocusManager;
  constructor(focusManager: FocusManager) {
    this._focusManager = focusManager;
  }

  findNavigableTargetItem = (event: MouseEvent | KeyboardEvent): HTMLElement | undefined => {
    const item = event.currentTarget as HTMLElement;
    if (this._focusManager.hasCompositeRole(item)) return item;

    return this._focusManager.getParent(item);
  };

  abstract keyboardEventHandler(event: KeyboardEvent): boolean;

  mouseEventHandler(event: MouseEvent): boolean {
    event.preventDefault();
    const item = this.findNavigableTargetItem(event);
    if (item) {
      this._focusManager.focus(item);
      return true;
    }

    return false;
  }
}
