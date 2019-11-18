import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-generate-form',
  templateUrl: './generate-form.component.html',
  styleUrls: ['./generate-form.component.scss'],
})
export class GenerateFormComponent {

  constructor(private router: Router) { }

  rows = new FormControl('',  [Validators.required,
                              Validators.pattern('[0-9]+$'),
                              Validators.max(50)]);
  cols = new FormControl('', [Validators.required,
                              Validators.pattern('[0-9]+$'),
                              Validators.max(26)]);

  generateTable() {
    this.router.navigate(['/table'],
                        {queryParams: {
                          rows: this.rows.value,
                          cols: this.cols.value
                        }});
  }

}
