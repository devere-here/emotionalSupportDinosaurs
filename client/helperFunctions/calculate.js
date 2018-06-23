const addition = (num1, num2) => +(num1) + +(num2),
  subtraction = (num1, num2) => num1 - num2,
  multiplication = (num1, num2) => num1 * num2,
  division = (num1, num2) => num1 / num2


const calculate = (num1, num2, operation) => {

  switch (operation){
    case '+':
    case 'plus':
      return addition(num1, num2)
    case '-':
    case 'minus':
      return subtraction(num1, num2)
    case '*':
    case 'times':
    case 'multiplied':
      return multiplication(num1, num2)
    case '/':
    case 'divided':
      return division(num1, num2)
    default:
      return 'sorry I did not understand you'
  }
}

export default calculate
