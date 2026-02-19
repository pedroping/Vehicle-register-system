import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LoadingHandleService } from '@services';

@Component({
  selector: 'info-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss'],
  standalone: true,
  host: {
    '[style.display]': 'display()',
  },
})
export class LoadingSpinnerComponent implements OnInit {
  display = signal<'none' | 'flex'>('none');

  private readonly destroyRef = inject(DestroyRef);
  private readonly loadingHandleService = inject(LoadingHandleService);

  ngOnInit(): void {
    this.loadingHandleService.showInterceptor$$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        this.display.set(value ? 'flex' : 'none');
      });
  }
}
