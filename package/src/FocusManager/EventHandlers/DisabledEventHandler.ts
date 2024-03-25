import { AbstractEventHandler } from './AbstractEventHandler';

export class DisabledEventHandler extends AbstractEventHandler {
  keyboardEventHandler() {
    return false;
  }
  mouseEventHandler() {
    return false;
  }
}
