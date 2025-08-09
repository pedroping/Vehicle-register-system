import { Component, inject, OnDestroy, output } from '@angular/core';
import { IDialogComponent, IDialogTokenData } from '@shared/models';
import { DIALOG_TOKEN } from '@shared/tokens/dialog/dialog-token';

@Component({
  selector: 'info-confirm-action',
  templateUrl: './confirm-action.component.html',
  styleUrls: ['./confirm-action.component.scss'],
  standalone: true,
})
export class ConfirmActionComponent
  implements IDialogComponent<boolean>, OnDestroy
{
  hasEmit = false;
  event = output<boolean>();

  private readonly dialogToken =
    inject<IDialogTokenData<boolean>>(DIALOG_TOKEN);

  cancel() {
    this.hasEmit = true;
    this.event.emit(false);
    this.dialogToken.close(false);
  }

  confirm() {
    this.hasEmit = true;
    this.event.emit(true);
    this.dialogToken.close(true);
  }

  ngOnDestroy() {
    if (!this.hasEmit) this.event.emit(false);
  }
}
