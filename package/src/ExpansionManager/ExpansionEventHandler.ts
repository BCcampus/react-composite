import type { KeyboardEvent, MouseEvent } from 'react';
import type { FocusManager } from '../FocusManager/FocusManager';
import type { ExpansionManager } from './ExpansionManager';

export class ExpansionEventHandler {
  protected _focusManager: FocusManager;
  protected _expansionManager: ExpansionManager;

  constructor(focusManager: FocusManager, expansionManager: ExpansionManager) {
    this._focusManager = focusManager;
    this._expansionManager = expansionManager;
  }

  keyboardEventHandler(event: KeyboardEvent) {
    const el = this._focusManager.focused.element;
    if (el) {
      if (event.key === 'Enter') {
        event.preventDefault();
        this._expansionManager.toggleExpand(el);
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        this._expansionManager.collapse(el);
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        this._expansionManager.expand(el);
      } else if (event.key === '*') {
        event.preventDefault();
        if (event.ctrlKey) {
          this._expansionManager.toggleAll();
        } else if (this._expansionManager.options.multiple) {
          this._expansionManager.expandSiblings(el);
        } else {
          this._expansionManager.expand(el);
        }
      }
    }
  }

  mouseEventHandler(event: MouseEvent) {
    const el = this._focusManager.focused.element;
    event.preventDefault();
    if (el) {
      this._expansionManager.toggleExpand(el);
    }
  }
}
