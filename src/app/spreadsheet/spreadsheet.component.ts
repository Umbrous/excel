import { Component, OnInit } from '@angular/core';
import calc from '../data/calcExpression';
import { TableId } from '../data/table-id';
import { ActivatedRoute } from '@angular/router';

import { ExpressionCalculator } from '../data/calcExpression';

@Component({
  selector: 'app-spreadsheet',
  templateUrl: './spreadsheet.component.html',
  styleUrls: ['./spreadsheet.component.scss']
})

export class SpreadsheetComponent implements OnInit {
  public headers: string[];

  public  arrayInputs: TableId[][];

  private  rows: number;

  private  cols: number;

  public  showMessage = false;

  constructor(private route: ActivatedRoute) {}

  generateTable() {
    this.arrayInputs = [];
    this.headers = ['#'];

    for (let i = 0; i <= this.rows; i++) {
      const columns: TableId[] = [];
      if (i > 0) {
        columns.push({id: '#', value: i.toString()});
      }
      for (let j = 0; j < this.cols; j++) {
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
    // this.showMessage = false;
    for (let i = 1; i < this.arrayInputs.length; i++) {
      this.arrayInputs[i].forEach((element) => {
        if (element.value.charAt(0) === '=') {
          const clearExpression = element.value.slice(1);

          // rewrite



          // this.showMessage = true;
          element.value = this.calculateExpression(element.value.slice(1));
        }
      });
    }
    // this.showMessage = !this.showMessage;
  }

  calculateExpression(expression: string) {
    const ids = expression.trim().split(/[\*,+,\/,-]+/);
    const valueArrays = this.getValueArray(ids);

    if (Array.isArray(valueArrays)) {
      if ( valueArrays.length === 1) {
        return valueArrays.join();
      } else {
        for (let j = 0; j < ids.length; j++) {
          expression = expression.replace(ids[j], valueArrays[j]);
        }

        const expressionCalculator =  new ExpressionCalculator();
        const ExpressionArray = expressionCalculator.convertExpressionToArray(expression);
        const temp = expressionCalculator.calculation(ExpressionArray);

        return temp;
      }
    } else {
      return valueArrays;
    }
  }

  getValueArray(arrayId: string[]) {
    const resultArr = [];

    for (const id of arrayId) {
      if (!isNaN(id as any)) {
        resultArr.push(parseInt(id));
      } else {
        for (let i = 1; i < this.arrayInputs.length; i++) {
          const tempValue: any = this.arrayInputs[i].find(x => x.id === id );
          if (tempValue) {
            if (isNaN(tempValue.value) && tempValue.value[0] !== '=' || tempValue.value === '') {
              return '!VALID';
            } else if (tempValue.value[0] === '=') {
              resultArr.push(this.calculateExpression(tempValue.value.slice(1)));
            } else {
              resultArr.push(parseInt(tempValue.value));
            }
          }
        }
      }
    }
    return resultArr;
  }

  ngOnInit(): void {
    const routeParams = this.route.queryParams;
    routeParams.subscribe((data) => {
      this.rows = data.rows;
      this.cols = data.cols;
  });

    this.generateTable();
  }

}
