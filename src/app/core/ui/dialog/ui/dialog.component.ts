import { AsyncPipe } from '@angular/common';
import {
  Component,
  DestroyRef,
  HostListener,
  inject,
  OnInit,
  signal,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DialogHandleService } from '@core/services/utils/dialog-handle/dialog-handle.service';
import { IN_OUT_ANIMATION_Y } from '@shared/animations';

@Component({
  selector: 'info-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  standalone: true,
  host: {
    '[style.display]': 'display()',
  },
  animations: [IN_OUT_ANIMATION_Y],
  imports: [AsyncPipe],
})
export class DialogComponent implements OnInit {
  display = signal<'none' | 'flex'>('none');
  vcr = viewChild('vcr', { read: ViewContainerRef });

  private readonly destroyRef = inject(DestroyRef);
  private readonly dialogHandleService = inject(DialogHandleService);

  state$ = this.dialogHandleService.state$$;

  @HostListener('click') onClick() {
    this.dialogHandleService.setState(false);
  }

  ngOnInit(): void {
    this.setVcr();
    this.dialogHandleService.state$$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((state) => {
        document.body.style.overflow = state ? 'hidden' : 'auto';
        this.display.set(state ? 'flex' : 'none');
      });
  }

  setVcr() {
    const vcr = this.vcr();
    if (vcr) this.dialogHandleService.setVcr(vcr);
  }
}
