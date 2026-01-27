import { AnimationMetadata, style, animate } from '@angular/animations';

export const ENTER_ANIMATION_Y: AnimationMetadata[] = [
  style({ opacity: 0, transform: 'translateY(-20px)' }),
  animate(50, style({ opacity: 1, transform: 'translateY(0)' })),
];

export const LEAVE_ANIMATION_Y: AnimationMetadata[] = [
  style({ opacity: 1, transform: 'translateY(0)' }),
  animate(50, style({ opacity: 1, transform: 'translateY(-20px)' })),
];
