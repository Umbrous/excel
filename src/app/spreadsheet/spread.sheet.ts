import { SpreadSheetUtils } from './spread.sheet.utils';
import { ICell, IBodyCell } from './cell';

export class Cell implements ICell {
  public value: string;
  public id: string;
}

export abstract class BuilderBase {
  protected readonly spreadSheetUtils: SpreadSheetUtils;

  constructor() {
    this.spreadSheetUtils = new SpreadSheetUtils();
  }
}

export default class CellBuilder extends BuilderBase {
  private readonly DEFAULT_COLUMN_CHAR: string = '#';

  private readonly headerCells: Array<ICell> = [];
  private readonly bodyCells: Array<Array<IBodyCell>> = [];

  constructor() {
    super();
  }

  public buildHeaderCells(columnNumbers: number): Array<ICell> {
    this.headerCells.length = 0;
    this.headerCells.push(this.insertDefaultColumn());

    for (let index = 0; index < columnNumbers; index++) {
      const cell = this.newCell();
      cell.value = this.generateHeaderColumnNumber(index);
      this.headerCells.push(cell);
    }

    return this.headerCells;
  }

  public buildBodyCells(
    rowsNumbers: number,
    columnNumbers: number
  ): Array<Array<IBodyCell>> {
    this.bodyCells.length = 0;

    for (let row = 1; row <= rowsNumbers; row++) {
      const rowCells: Array<IBodyCell> = [];

      for (let col = 0; col <= columnNumbers; col++) {
        const cell = this.newCell();
        if (col === 0) {
          cell.id = this.DEFAULT_COLUMN_CHAR;
          cell.value = row.toString();
        } else {
          const startIndex = col - 1;
          cell.id = this.generateColumnNumber(row, startIndex);
          cell.value = '';
        }
        rowCells.push(cell);
      }
      this.bodyCells.push(rowCells);
    }

    return this.bodyCells;
  }

  private insertDefaultColumn() {
    const defaultColumn = this.newCell();
    defaultColumn.value = this.DEFAULT_COLUMN_CHAR;
    return defaultColumn;
  }

  private generateColumnNumber(rowIndex: number, columnIndex: number) {
    return this.spreadSheetUtils.generateColumnNumber(rowIndex, columnIndex);
  }

  private generateHeaderColumnNumber(columnIndex: number) {
    return this.spreadSheetUtils.generateHeaderColumnValue(columnIndex);
  }

  private newCell(): Cell {
    return new Cell();
  }
}
