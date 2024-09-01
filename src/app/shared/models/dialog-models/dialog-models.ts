import { OutputEmitterRef } from '@angular/core';

export interface IDialogComponent<T> {
  event: OutputEmitterRef<T>;
}
