import { isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, TransferState } from '@angular/core';
import { ITransferkeys, MAKE_STATE_KEYS } from '@models';

@Injectable({
  providedIn: 'root',
})
export class TransferStateService {
  constructor(
    @Inject(PLATFORM_ID) private readonly platformID: object,
    private readonly transferState: TransferState,
  ) {}

  setKey<K extends keyof ITransferkeys>(key: K, data?: ITransferkeys[K]) {
    if (isPlatformServer(this.platformID)) {
      const myData = process.env[key] as ITransferkeys[K];
      this.transferState.set(MAKE_STATE_KEYS[key], data ?? myData);
    }
  }

  getKey<K extends keyof ITransferkeys>(key: K): ITransferkeys[K] | undefined {
    return this.transferState.get(MAKE_STATE_KEYS[key], '');
  }
}
