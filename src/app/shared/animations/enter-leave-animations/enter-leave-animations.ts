import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const IN_OUT_ANIMATION_Y = trigger('inOutAnimation', [
  state('true', style({ opacity: 1, transform: 'translateY(0)' })),
  state('false', style({ opacity: 0, transform: 'translateY(-100%)' })),
  transition('false => true', [
    style({ opacity: 0, transform: 'translateY(-100%)' }),
    animate('300ms ease'),
  ]),
  transition('true => false', [
    style({ opacity: 1, transform: 'translateY(0)' }),
    animate('300ms ease'),
  ]),
]);
