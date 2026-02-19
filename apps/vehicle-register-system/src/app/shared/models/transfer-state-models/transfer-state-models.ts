import { makeStateKey, StateKey } from '@angular/core';

export interface ITransferkeys {
  myData: string;
  VERY_SECRET: string;
}

export const MAKE_STATE_KEYS: Record<keyof ITransferkeys, StateKey<string>> = {
  myData: makeStateKey<string>('myData'),
  VERY_SECRET: makeStateKey<string>('VERY_SECRET'),
};
