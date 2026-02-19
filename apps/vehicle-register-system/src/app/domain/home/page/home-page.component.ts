import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent, HeaderComponent } from '@ui';

@Component({
  selector: 'info-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  imports: [FooterComponent, HeaderComponent, RouterOutlet],
})
export class HomePageComponent {}
