import { afterNextRender, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TransferStateService } from '@services';

@Component({
  selector: 'info-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  imports: [RouterLink],
  host: {
    ngSkipHydration: 'true',
  },
})
export class LoginPageComponent implements OnInit {
  constructor(private readonly transferStateService: TransferStateService) {
    afterNextRender(() => {
      console.info('Secret res: ', this.transferStateService.getKey('VERY_SECRET'));
    });
  }

  ngOnInit() {
    console.info('Secret res: ', this.transferStateService.getKey('VERY_SECRET'));
  }
}
