import { Component } from '@angular/core';

import { RouterPathes } from 'src/app/app-routing.module';

@Component({
  selector: 'pv-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: { class: 'pv-page-wrapper' },
})
export class HomeComponent {
  RouterPathes = RouterPathes;
}
