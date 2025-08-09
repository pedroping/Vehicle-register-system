import { OutputEmitterRef } from '@angular/core';
import { Subject } from 'rxjs';

export interface IDialogComponent<T> {
  event: OutputEmitterRef<T>;
}

export interface IDialogTokenData<T = unknown> {
  close$: Subject<T>;
  open$: Subject<void>;
  close(arg: T): void;
}
