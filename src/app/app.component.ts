import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import calc from './data/calc';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Simple Excel';
  activateTable = false;
  headers = [];
  arrayInputs = [];
  rows = new FormControl('', [Validators.required, Validators.pattern('[0-9]')]);
  colls = new FormControl('', [Validators.required, Validators.pattern('[0-9]')]);

  constructor() {}

  generateTable() {
    this.arrayInputs = [];
    this.headers = ['#'];
    for (let i = 0; i <= this.rows.value; i++) {
      let columns = [];
      if(i > 0) {
        columns.push({id: '#', value: i.toString()});
      }
      for (let j = 0; j < this.colls.value; j++) {
        if (i === 0 ) {
          this.headers.push(String.fromCharCode(65 + j));
        } else {
          columns.push({
            id: `${String.fromCharCode(65 + j)}${i}`,
            value: ''
          });
        }
      }
      this.arrayInputs.push(columns);
    }

    this.activateTable = !this.activateTable;
  }

  onUpdate(event: any, id: string) {

    for (const arr of this.arrayInputs) {
      arr.forEach((element) => {
        if (element.id === id) {
          element.value = event.target.value;
        }
      });
    }

  }

  calculate() {
    for (let i = 1; i < this.arrayInputs.length; i++) {

      this.arrayInputs[i].forEach((element) => {
        if (element.value.charAt(0) === '=') {

          let expression = element.value.slice(1);
          let ids = expression.split(/[\*,+,\/,-]+/);
          const valueArrays = this.getValueArray(ids);
          if (Array.isArray(valueArrays)) {
            for (let j = 0; j < ids.length; j++) {
              expression = expression.replace(ids[j], valueArrays[j]);
            }
            element.value = calc(expression);
          } else {
            element.value = valueArrays;
          }
        }
      });
    }

  }

  getValueArray(arrayId: Array<string>) {
    let resultArr = [];
    for (const id of arrayId) {
      for (let i = 1; i < this.arrayInputs.length; i++) {
        let tempValue = this.arrayInputs[i].find(x => x.id === id );
        if (tempValue) {
          if (isNaN(tempValue.value)) {
            return '!VALID';
          }
          resultArr.push(parseInt(tempValue.value));
        }
      }
    }
    return resultArr;
  }

}
