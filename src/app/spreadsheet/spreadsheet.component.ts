import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import calc from '../data/calc';

@Component({
  selector: 'app-spreadsheet',
  templateUrl: './spreadsheet.component.html',
  styleUrls: ['./spreadsheet.component.scss']
})
export class SpreadsheetComponent implements OnInit {
  ngOnInit(): void {
    this.generateTable();
  }
  headers = [];
  arrayInputs = [];
  @Input() rows: number;
  @Input() colls: number;

  generateTable() {
    this.arrayInputs = [];
    this.headers = ['#'];
    for (let i = 0; i <= this.rows; i++) {
      let columns = [];
      if(i > 0) {
        columns.push({id: '#', value: i.toString()});
      }
      for (let j = 0; j < this.colls; j++) {
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
          element.value = this.calculateExpression(element.value.slice(1));
        }
      });
    }

  }

  calculateExpression(expression: string) {
    const ids = expression.split(/[\*,+,\/,-]+/);
    const valueArrays = this.getValueArray(ids);
    if (Array.isArray(valueArrays)) {
      for (let j = 0; j < ids.length; j++) {
        expression = expression.replace(ids[j], valueArrays[j]);
      }
      return calc(expression);
    } else {
      return valueArrays;
    }
  }

  getValueArray(arrayId: Array<string>) {
    let resultArr = [];
    for (const id of arrayId) {
      for (let i = 1; i < this.arrayInputs.length; i++) {
        let tempValue = this.arrayInputs[i].find(x => x.id === id );
        if (tempValue) {
          if (isNaN(tempValue.value) && tempValue.value[0] !== '=') {
            return '!VALID';
          } else if (tempValue.value[0] === '=') {
            resultArr.push(this.calculateExpression(tempValue.value.slice(1)));
          } else {
            resultArr.push(parseInt(tempValue.value));
          }

        }
      }
    }
    return resultArr;
  }

}
