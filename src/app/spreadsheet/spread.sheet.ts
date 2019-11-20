import { SpreadSheetUtils } from './spread.sheet.utils';

export interface ICell {
  Value: string;
}

export interface IHeaderCell extends ICell {
  Value: string;
}

export class HeaderCell implements IHeaderCell {
  public Value: string;
  public Id: string;
}

export abstract class BuilderBase {
  protected readonly SpreadSheetUtils: SpreadSheetUtils;

  constructor() {
    this.SpreadSheetUtils = new SpreadSheetUtils();
  }

}

export class HeaderCellBuilder extends BuilderBase {
  private readonly DEFAULT_COLUMN_CHAR: string = '#';

  private readonly HeaderCells: Array<IHeaderCell> = [];

  constructor()  {
    super();
  }

  public BuildHeaderCells(columnNumbers: number): Array<ICell> {

    this.Reset();
    this.InsertDefaultColumn();

    for (let index = 0; index < columnNumbers; index++) {
        const column = this.NewHeaderCell();
        column.Value = this.GenerateColumnNumber(index);
        this.HeaderCells.push(column);
    }

    return this.HeaderCells;
  }

  private Reset() {
    this.HeaderCells.length = 0;
  }

  private InsertDefaultColumn() {
    const defaultColumn = this.NewHeaderCell();
    defaultColumn.Value = this.DEFAULT_COLUMN_CHAR;
    return defaultColumn;
  }

  private GenerateColumnNumber(columnIndex: number) {
    return this.SpreadSheetUtils.GenerateColumnNumber(columnIndex);
  }

  private NewHeaderCell(): HeaderCell {
    return new HeaderCell();
  }
}

export class SpreadSheet {

  private readonly HeaderCellBuilder: HeaderCellBuilder;

  constructor() {
    this.HeaderCellBuilder = new HeaderCellBuilder();

    const g = this.HeaderCellBuilder.BuildHeaderCells(10);
  }

}
