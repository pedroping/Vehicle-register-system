import { Component, inject, OnDestroy, output } from '@angular/core';
import { DialogHandleService } from '@core/services/utils/dialog-handle/dialog-handle.service';
import { IDialogComponent } from '@shared/models';

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

  private readonly dialogHandleService: DialogHandleService<boolean> =
    inject(DialogHandleService);

  cancel() {
    this.hasEmit = true;
    this.event.emit(false);
    this.dialogHandleService.setState(false);
  }

  confirm() {
    this.hasEmit = true;
    this.event.emit(true);
    this.dialogHandleService.setState(false);
  }

  ngOnDestroy() {
    if (!this.hasEmit) this.event.emit(false);
  }
}
