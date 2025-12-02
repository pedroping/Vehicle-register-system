import { Location } from '@angular/common';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HasChangesService {
  private readonly hasChanges: { [key: string]: boolean } = {};
  private readonly location = inject(Location);

  startDomain() {
    if (globalThis?.window) window.addEventListener('beforeunload', this.beforeUnloadFn.bind(this));
  }

  setChange(key: string, value: boolean) {
    this.hasChanges[key] = value;
  }

  getChange(key: string) {
    return this.hasChanges?.[key] ?? false;
  }

  private async beforeUnloadFn(event: Event) {
    const url = this.location.path();

    if (!this.getChange(url)) return;

    event.preventDefault();
    return 'Loucura';
  }
}
