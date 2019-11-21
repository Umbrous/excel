import { Priority } from './priority';

export interface IOperator {
    value: string;
    priority: Priority;
    operatorAction: (leftOperand: number, rightOperand: number) => number;
}
