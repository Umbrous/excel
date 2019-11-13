import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'Simple Excel';
  activateTable = false;
  rows = new FormControl('',  [Validators.required,
                              Validators.pattern('[0-9]+$'),
                              Validators.max(50)]);
  colls = new FormControl('', [Validators.required,
                              Validators.pattern('[0-9]+$'),
                              Validators.max(26)]);

  generateTable() {
    this.activateTable = true;
  }
}
