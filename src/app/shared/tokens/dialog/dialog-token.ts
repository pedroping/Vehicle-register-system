import { InjectionToken } from '@angular/core';
import { IDialogTokenData } from '@shared/models';

export const DIALOG_TOKEN = new InjectionToken<IDialogTokenData>(
  'DIALOG_TOKEN'
);
