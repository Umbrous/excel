import { Priority } from './priority';
import { IOperator } from './operator';
import { IBodyCell } from '../spreadsheet/cell';

export class Operator implements IOperator {
  public value: string;
  public priority: Priority;
  public operatorAction: (leftOperand: number, rightOperand: number) => number;
}

export class OperatorFactory {
  public NewOperator(
    symbol: string,
    priority: Priority,
    operatorAction: (leftOperand: number, rightOperand: number) => number
  ) {
    const operator = new Operator();
    operator.value = symbol;
    operator.priority = priority;
    operator.operatorAction = operatorAction;

    return operator;
  }
}

export default class ExpressionCalculator {
  private readonly defaultApplicationOperators: Array<IOperator> = [];

  private readonly OperatorFactory: OperatorFactory;

  constructor() {
    this.OperatorFactory = new OperatorFactory();

    this.defaultApplicationOperators = [
      this.OperatorFactory.NewOperator('+', Priority.Low, (l, r) => l + r),
      this.OperatorFactory.NewOperator('*', Priority.High, (l, r) => l * r),
      this.OperatorFactory.NewOperator('/', Priority.Medium, (l, r) => {
        try {
          return l / r;
        } catch (error) {
          return 0;
        }
      }),
      this.OperatorFactory.NewOperator('-', Priority.Low, (l, r) => l - r)
    ];

    this.defaultApplicationOperators.sort((a, b) => a.priority > b.priority ? -1 : 1);
  }

  public convertExpressionToArray(expression: string): string[]  {
    let operand = '';
    const emptyString = '';
    const elementsExpression: string[] = [];

    for (const currentChar of expression) {
      const foundOperator = this.defaultApplicationOperators.find(
        x => x.value === currentChar
      );
      if (foundOperator) {
        elementsExpression.push(operand, foundOperator.value);
        operand = emptyString;
      } else {
        operand += currentChar;
      }
    }
    // add last operand to elements Expression Array
    elementsExpression.push(operand);
    return elementsExpression;
  }

  public calculation(elementsExpression: string[]): string {
    let result: string;

    for ( const operator of this.defaultApplicationOperators ) {
      for ( let index = 0; index < elementsExpression.length; index++ ) {
        const indexOperator = (elementsExpression.indexOf(operator.value));
        if (indexOperator !== -1) {
          const leftIndex = indexOperator - 1;
          const rightIndex = indexOperator + 1;
          const leftOperand = +elementsExpression[leftIndex];
          const rightOperand = +elementsExpression[rightIndex];
          const value = operator.operatorAction(leftOperand, rightOperand);

          elementsExpression.splice(leftIndex, 3, value.toString());
          index = 0;
        }
      }
    }
    result = elementsExpression[0];

    return result;
  }

  public getResultFromExpression(expression: string, arrayValues: Array<Array<IBodyCell>>): string {
    let result: string;
    const regExpOperators = /[\*,+,\/,-]+/;
    const arrayIds = expression.trim().split(regExpOperators);
    const valueArrays = this.getValueFromArrayId(arrayIds, arrayValues);

    if (valueArrays.length === 0 || valueArrays.length === 1) {
      return valueArrays.join() || '!VALID';
    }

    for (let id = 0; id < arrayIds.length; id++) {
      expression = expression.replace(arrayIds[id], valueArrays[id].toString());
    }

    const ExpressionArray = this.convertExpressionToArray(expression);
    result = this.calculation(ExpressionArray);

    return result;
  }

  public getValueFromArrayId(arrayIds: string[], arrayValues: Array<Array<IBodyCell>> ): number[] {
    const values: number[] = [];

    for (const id of arrayIds) {
      if (!isNaN(+id)) {
        values.push(parseInt(id));
      } else {
        for (const row of arrayValues) {
          const findCell: IBodyCell = row.find(cell => cell.id === id );
          if (findCell) {
            if (isNaN(+findCell.value)
              && findCell.value[0] !== '='
              || findCell.value === '') {
                values.length = 0;
              return values;
            } else if (findCell.value[0] === '=') {
              values.push(+this.getResultFromExpression(findCell.value.slice(1), arrayValues));
            } else {
              values.push(parseInt(findCell.value));
            }
          }
        }
      }
    }
    return values;
  }
}
