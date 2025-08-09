import { DOCUMENT } from '@angular/common';
import {
  ApplicationRef,
  createComponent,
  EnvironmentInjector,
  inject,
  Injectable,
  Injector,
  NgZone,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { DialogComponent } from '@core/ui/dialog';
import { IDialogComponent } from '@shared/models';
import { DIALOG_TOKEN } from '@shared/tokens/dialog/dialog-token';
import { BehaviorSubject, debounceTime, Subject, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogHandleService<T> {
  private _applicationRef = inject(ApplicationRef);
  private _environmentInjector = inject(EnvironmentInjector);
  private _document = inject(DOCUMENT);
  private _ngZone = inject(NgZone);

  openModal<Y = unknown>(component: Type<IDialogComponent<T>>) {
    const close$ = new Subject<Y>();
    const open$ = new Subject<void>();
    const close = (arg: Y) => {
      close$.next(arg);
    };

    const elementInjector = Injector.create(
      [
        {
          provide: DIALOG_TOKEN,
          useValue: {
            close$,
            open$,
            close,
          },
        },
      ],
      this._environmentInjector
    );

    const ref = createComponent(component, {
      environmentInjector: this._environmentInjector,
      elementInjector,
    });

    const modalRef = createComponent(DialogComponent, {
      environmentInjector: this._environmentInjector,
      elementInjector,
      projectableNodes: [[ref.location.nativeElement]],
    });

    this._applicationRef.attachView(modalRef.hostView);
    this._document.body.appendChild(modalRef.location.nativeElement);

    this._ngZone.onStable.pipe(debounceTime(10), take(1)).subscribe(() => {
      open$.next();
    });

    close$.pipe(debounceTime(300), take(1)).subscribe(() => {
      this._document.body.removeChild(modalRef.location.nativeElement);
      ref.destroy();
      modalRef.destroy();
    });

    return { close$, open$, close };
  }
}
