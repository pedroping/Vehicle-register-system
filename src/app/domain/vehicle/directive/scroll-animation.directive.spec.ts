import { DestroyRef } from '@angular/core';
import { ScrollAnimationDirective } from './scroll-animation.directive';

describe('Directive: ScrollAnimation', () => {
  it('should create an instance', () => {
    const directive = new ScrollAnimationDirective({} as DestroyRef, {});
    expect(directive).toBeTruthy();
  });
});
