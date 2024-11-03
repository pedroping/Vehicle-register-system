import { Injectable, Type, ViewContainerRef } from '@angular/core';
import { IDialogComponent } from '@shared/models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogHandleService<T> {
  private vcr?: ViewContainerRef;
  private state$ = new BehaviorSubject<boolean>(false);

  setVcr(vcr: ViewContainerRef) {
    this.vcr = vcr;
  }

  setState(state: boolean) {
    this.state$.next(state);

    if (!state) this.vcr?.clear();
  }

  openModal(component: Type<IDialogComponent<T>>) {
    if (!this?.vcr) throw new Error('Vcr not seted!');

    this.setState(true);
    const { instance } = this.vcr?.createComponent(component);

    return instance;
  }

  get state$$() {
    return this.state$.asObservable();
  }

  get state() {
    return this.state$.value;
  }
}
