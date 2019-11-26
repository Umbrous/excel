import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { ICell, IBodyCell } from "./cell";
import CellBuilder from "./spread.sheet";
import ExpressionCalculator from "../data/expressionCalculator";

@Component({
  selector: "app-spreadsheet",
  templateUrl: "./spreadsheet.component.html",
  styleUrls: ["./spreadsheet.component.scss"]
})
export class SpreadsheetComponent implements OnInit {
  private rows: number;

  private cols: number;

  public headerTable: Array<ICell>;

  public bodyTable: Array<Array<IBodyCell>>;

  public showMessage = false;

  constructor(private route: ActivatedRoute) {}

  public trackBy(index, item) {
    if (!item) {
      return null;
    }
    return index;
  }

  generateTable() {
    const table = new CellBuilder();
    this.headerTable = table.buildHeaderCells(this.cols);
    this.bodyTable = table.buildBodyCells(this.rows, this.cols);
  }

  onChangeTable(event: any, id: string): void {
    for (const iterationRow of this.bodyTable) {
      iterationRow.forEach(cell => {
        if (cell.id === id) {
          cell.value = event.target.value;
        }
      });
    }
  }

  calculateTable() {
    this.toggleMessage();
    for (const row of this.bodyTable) {
      row.forEach(element => {
        if (element.value.charAt(0) === "=") {
          this.toggleMessage();
          const expression = element.value.slice(1);
          const calculateExpression = new ExpressionCalculator();
          element.value = calculateExpression.getResult(
            expression,
            this.bodyTable
          );
        }
      });
    }
  }

  toggleMessage() {
    this.showMessage = !this.showMessage;
  }

  ngOnInit(): void {
    const routeParams = this.route.queryParams;
    routeParams.subscribe(data => {
      this.rows = data.rows;
      this.cols = data.cols;
    });
    this.generateTable();
  }
}
