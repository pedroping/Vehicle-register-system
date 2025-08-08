import { DOCUMENT } from '@angular/common';
import {
  ApplicationRef,
  createComponent,
  EnvironmentInjector,
  inject,
  Injectable,
  Injector,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { IDialogComponent } from '@shared/models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogHandleService<T> {
  private vcr?: ViewContainerRef;
  private state$ = new BehaviorSubject<boolean>(false);

  private _applicationRef = inject(ApplicationRef);
  private _injector = inject(Injector);
  private _environmentInjector = inject(EnvironmentInjector);
  private _document = inject(DOCUMENT);

  setVcr(vcr: ViewContainerRef) {
    this.vcr = vcr;
  }

  setState(state: boolean) {
    this.state$.next(state);

    if (!state) this.vcr?.clear();
  }

  openModal(component: Type<IDialogComponent<T>>) {
    this.setState(true);
    const ref = createComponent(component, {
      environmentInjector: this._environmentInjector,
    });

    console.log(ref.location);

    this._applicationRef.attachView(ref.hostView);

    this._document.body.appendChild(ref.location.nativeElement);

    return;
  }

  get state$$() {
    return this.state$.asObservable();
  }

  get state() {
    return this.state$.value;
  }
}
