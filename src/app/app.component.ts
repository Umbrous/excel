import { Component, ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'Simple Excel';

  constructor() {
    const arr = [3, 5, 6, 43, 342, 233, 56];

    for (let i = 0; i < arr.length; i++ ) {
      if (arr[i] > arr[i + 1]) {
        arr[i + 1] += arr[i];
        arr[i] = arr[i + 1] - arr[i];
        arr[i + 1] -= arr[i];
        i = 0;
      }
    }
  }
}
