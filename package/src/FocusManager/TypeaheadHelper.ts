import type { FocusManager } from './FocusManager';

interface TypeaheadOptions {
  typeaheadSearchDelay: number;
  typeaheadResetDelay: number;
}

export class TypeaheadHelper {
  private _focusManager: FocusManager;
  private _options: TypeaheadOptions;

  private _typeahead: string = '';
  private lastSearchTime: number = null;
  private resetTimer = null;
  private searchTimer = null;
  private hasMatch: boolean;

  constructor(focusManager: FocusManager, options: TypeaheadOptions) {
    this._focusManager = focusManager;
    this._options = options;
  }

  get typeahead() {
    return this._typeahead;
  }

  protected focusByLabel(query: string, start: number) {
    for (let i = start; i < this._focusManager.itemCount; i += 1) {
      if (this._focusManager.isFocusableItemIndex(i)) {
        const label = this._focusManager.getLabelAt(i);

        if (label && label.toLowerCase().indexOf(query) === 0) {
          return this._focusManager.focusAt(i);
        }
      }
    }
    return false;
  }

  protected resetTypeahead = () => {
    clearTimeout(this.resetTimer);
    this.resetTimer = setTimeout(() => {
      this._typeahead = '';
      this.hasMatch = null;
      this.resetTimer = null;
      this.lastSearchTime = null;
    }, this._options.typeaheadResetDelay);
  };

  protected searchTypeahead = (query: string, start: number) => {
    if (!this.lastSearchTime) this.lastSearchTime = Date.now();
    clearTimeout(this.searchTimer);

    this.searchTimer = setTimeout(() => {
      this.hasMatch = this.focusByLabel(query, start);
      if (!this.hasMatch && start > 0) this.hasMatch = this.focusByLabel(query, 0);
    }, this._options.typeaheadSearchDelay);

    if (Date.now() - this.lastSearchTime > this._options.typeaheadSearchDelay) {
      this.searchTimer = null;
      this.lastSearchTime = Date.now();
    }

    this.resetTypeahead();
  };

  focus(char: string, start: number) {
    if (char === 'Backspace') this._typeahead = this._typeahead.slice(0, -1);
    else this._typeahead += char.toLowerCase();

    this.searchTypeahead(this._typeahead, start + (this.hasMatch ? 0 : 1));
  }
}
