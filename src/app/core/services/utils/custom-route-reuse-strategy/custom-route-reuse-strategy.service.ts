import { inject, Injectable, makeStateKey, TransferState } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  DetachedRouteHandle,
  RouteReuseStrategy,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CustomRouteReuseStrategy implements RouteReuseStrategy {
  private handlers = new Map<string, DetachedRouteHandle>();
  private readonly transferState = inject(TransferState);

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return route.data['reuse'] === true;
  }

  store(
    route: ActivatedRouteSnapshot,
    handle: DetachedRouteHandle | null
  ): void {
    if (handle && route.data['reuse'] === true) {
      const key = this.getRouteKey(route);
      this.handlers.set(key, handle);
    }
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    const key = this.getRouteKey(route);
    return route.data['reuse'] === true && this.handlers.has(key);
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    const key = this.getRouteKey(route);
    return route.data['reuse'] === true ? this.handlers.get(key) ?? null : null;
  }

  shouldReuseRoute(
    future: ActivatedRouteSnapshot,
    curr: ActivatedRouteSnapshot
  ): boolean {
    if (future.data['onlySrr']) {
      const hasAllKeys = future.data['keys'].every((key: string) => {
        return !!this.transferState.get(makeStateKey<string>(key), null);
      });

      if (!hasAllKeys) window.location.href = future.routeConfig?.path ?? '';

      return future.routeConfig === curr.routeConfig;
    }

    return future.routeConfig === curr.routeConfig;
  }

  private getRouteKey(route: ActivatedRouteSnapshot) {
    return (route.routeConfig ?? '') as string;
  }
}
