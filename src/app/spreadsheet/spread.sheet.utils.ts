export class SpreadSheetUtils {
  private readonly UNICODE_START_LETTER_CHAR: number = 65;

  private readonly INCREMENT_COLUMN_INDEX_NUMBER: number = 1;

  public GenerateColumnNumber(columnIndex: number) {
    return `${String.fromCharCode(this.UNICODE_START_LETTER_CHAR + columnIndex)}${columnIndex + this.INCREMENT_COLUMN_INDEX_NUMBER}`;
  }
}
