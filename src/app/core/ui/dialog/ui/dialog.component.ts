import { AnimationEvent } from '@angular/animations';
import { Component, HostListener, inject, OnInit, signal } from '@angular/core';
import { DialogHandleService } from '@core/services/utils/dialog-handle/dialog-handle.service';
import { IN_OUT_ANIMATION_Y } from '@shared/animations';
import { IDialogTokenData } from '@shared/models';
import { DIALOG_TOKEN } from '@shared/tokens/dialog/dialog-token';
import { take } from 'rxjs';

@Component({
  selector: 'info-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  standalone: true,
  host: {
    '[style.display]': 'display()',
  },
  animations: [IN_OUT_ANIMATION_Y],
})
export class DialogComponent implements OnInit {
  private readonly dialogHandleService = inject(DialogHandleService);
  private readonly dialogToken =
    inject<IDialogTokenData<boolean>>(DIALOG_TOKEN);

  display = signal<'none' | 'flex'>('none');
  state = signal(false);

  @HostListener('click') onClick() {
    this.dialogToken.close(false);
  }

  ngOnInit(): void {
    this.dialogToken.open$.pipe(take(1)).subscribe(() => {
      document.body.style.overflow = 'hidden';
      this.display.set('flex');
      this.state.set(true);
    });

    this.dialogToken.close$.pipe(take(1)).subscribe(() => {
      this.state.set(false);
    });
  }

  animationEnd(event: AnimationEvent) {
    if (event['fromState' as keyof AnimationEvent]) {
      this.display.set('none');
      document.body.style.overflow = 'auto';
    }
  }
}
