import { Priority } from './priority';

export interface IOperator {
  value: string;
  priority: Priority;
  operatorAction: (leftOperand: number, rightOperand: number) => number;
}
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

export class ExpressionCalculator {
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

    return elementsExpression[0];
  }
}

// rewrite cod
export default function(str: string) {
  return this.calculation(this.convertExpressionToArray(str));
}
