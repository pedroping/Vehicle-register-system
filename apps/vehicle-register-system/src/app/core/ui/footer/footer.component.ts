import { Component } from '@angular/core';

@Component({
  selector: 'info-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
})
export class FooterComponent {
  year = new Date().getFullYear();
}
