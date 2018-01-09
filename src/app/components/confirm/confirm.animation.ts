import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';

export const POPUP_ANIMATION: any =
  trigger('popup', [
    state('void', style({
      height: 0,
      opacity: 0,
    })),
    transition(':enter', animate('200ms ease-out')),
    transition(':leave', animate('200ms ease-out'))
  ]);
