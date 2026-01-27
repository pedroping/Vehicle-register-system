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
} from '@angular/core';
import { IDialogComponent } from '@models';
import { DIALOG_TOKEN } from '@tokens';
import { DialogComponent } from '@ui';
import { debounceTime, Subject, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogHandleService<T> {
  private _applicationRef = inject(ApplicationRef);
  private _environmentInjector = inject(EnvironmentInjector);
  private _document = inject(DOCUMENT, { optional: true });
  private _ngZone = inject(NgZone);

  openModal<Y = unknown>(component: () => Promise<Type<IDialogComponent<T>>>) {
    const close$ = new Subject<Y>();
    const open$ = new Subject<void>();
    const close = (arg: Y) => {
      close$.next(arg);
    };

    const elementInjector = Injector.create({
      providers: [
        {
          provide: DIALOG_TOKEN,
          useValue: {
            close$,
            open$,
            close,
          },
        },
      ],
      parent: this._environmentInjector,
    });

    component().then((_component) => {
      const ref = createComponent(_component, {
        environmentInjector: this._environmentInjector,
        elementInjector,
      });

      const modalRef = createComponent(DialogComponent, {
        environmentInjector: this._environmentInjector,
        elementInjector,
      });

      (modalRef.location.nativeElement as HTMLElement).firstChild!.appendChild(
        ref.location.nativeElement,
      );

      this._applicationRef.attachView(modalRef.hostView);
      this._document?.body.appendChild(modalRef.location.nativeElement);

      this._ngZone.onStable.pipe(debounceTime(10), take(1)).subscribe(() => {
        open$.next();
      });

      close$.pipe(debounceTime(300), take(1)).subscribe(() => {
        this._document?.body.removeChild(modalRef.location.nativeElement);
        ref.destroy();
        modalRef.destroy();
      });
    });

    return { close$, open$, close };
  }
}
