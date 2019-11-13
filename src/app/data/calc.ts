export default function(str: string) {
  return calc(parseExpression(str));
}

function parseExpression(a: string) {
  let arr = [];
  let current = '';

  for (let i = 0, ch; ch = a.charAt(i); i++) {

      if ('*/+-'.indexOf(ch) > -1) {

          if (current === '' && ch === '-') {
              current = '-';
          } else {
              arr.push(current, ch);
              current = '';
          }

      } else {
          current += a.charAt(i);
      }
  }

  if (current !== '') {
      arr.push(current);
  }

  return arr;
  }

function calc(arr: Array<string>) {
  const operators = ['*', '/', '+', '-'];
  let currentPosition: number;
  let result;

  for(let i = 0; i < operators.length; i++) {

    while (arr.indexOf(operators[i]) !== -1) {

      currentPosition = arr.indexOf(operators[i]);
      let firstOperand = parseFloat(arr[currentPosition - 1]);
      let secondOperand = parseFloat(arr[currentPosition + 1]);

      switch (operators[i]) {
        case '*':
          result = firstOperand * secondOperand;
          arr.splice(currentPosition - 1, 3, result);
          break;
        case '/':
          result = firstOperand / secondOperand;
          arr.splice(currentPosition - 1, 3, result);
          break;
        default:
          firstOperand = parseFloat(arr[0]);
          secondOperand = parseFloat(arr[2]);
          if (arr[1] === '+') {
              result = firstOperand + secondOperand;
          } else {
              result = firstOperand - secondOperand;
          }
          arr.splice(0, 3, result);
      }
    }
  }
  return arr[0];
}
