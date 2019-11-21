export class SpreadSheetUtils {
  private readonly UNICODE_START_LETTER_CHAR: number = 65;

  public generateColumnNumber(rowIndex: number, startIndex: number) {
    return `${String.fromCharCode(this.UNICODE_START_LETTER_CHAR + startIndex)}${rowIndex}`;
  }

  public generateHeaderColumnValue(columnIndex: number) {
    return String.fromCharCode(this.UNICODE_START_LETTER_CHAR + columnIndex);
  }
}
