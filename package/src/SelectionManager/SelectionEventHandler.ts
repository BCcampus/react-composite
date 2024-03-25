import type { KeyboardEvent, MouseEvent } from 'react';
import type { SelectionManager } from './SelectionManager';
import type { FocusManager } from '../FocusManager/FocusManager';

const movementKeys = [
  'ArrowUp',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'Home',
  'End',
  'PageUp',
  'PageDown',
];

export class SelectionEventHandler {
  protected _composite: FocusManager;
  protected _focusManager: FocusManager;
  protected _selectionManager: SelectionManager;

  constructor(
    composite: FocusManager,
    focusManager: FocusManager,
    selectionManager: SelectionManager
  ) {
    this._composite = composite;
    this._focusManager = focusManager;
    this._selectionManager = selectionManager;
  }

  keyboardEventHandler(event: KeyboardEvent) {
    if (this._focusManager.focused.element) {
      if (event.key === ' ') {
        event.preventDefault();
        // Changes the selection state of the focused option.
        if (!event.shiftKey) {
          this._selectionManager.toggleSelection(this._focusManager.focused.element);
        } else {
          // Shift + Space: Selects contiguous items from **the most recently selected item** to the focused item.
          this._selectionManager.selectRange();
        }
      } else if (event.key.toLowerCase() === 'a' && event.ctrlKey) {
        event.preventDefault();
        // Selects all options in the list.
        // If, all options are selected, it may also unselect all options.
        this._selectionManager.toggleAll();
      } else if (event.shiftKey && movementKeys.includes(event.key)) {
        // All focus movements with `Shift` modifier extends selection
        this._selectionManager.selectRange(this._focusManager.prevFocusedIndex);
      }

      if (this._focusManager.prevFocusedIndex !== this._focusManager.focused.index) {
        if (
          !this._selectionManager.options.multiple &&
          this._selectionManager.options.followFocus === true
        ) {
          this._selectionManager.toggleSelection(this._focusManager.focused.element);
        }
      }
    }
  }

  mouseEventHandler(event: MouseEvent) {
    event.preventDefault();
    if (this._focusManager.focused.element) {
      if (this._selectionManager.options.multiple && event.shiftKey) {
        this._selectionManager.selectRange();
      } else {
        this._selectionManager.toggleSelection(this._focusManager.focused.element);
      }
    }
  }
}
