import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivateFn, RouterStateSnapshot } from '@angular/router';
import { HasChangesService } from '@services';

export const canDeactivateGuard: CanDeactivateFn<unknown> = (
  _: unknown,
  __: ActivatedRouteSnapshot,
  currentState: RouterStateSnapshot,
) => {
  const hasChangesService = inject(HasChangesService);
  const url = currentState.url;
  const hasChanges = hasChangesService.getChange(url);

  return !hasChanges;
};
