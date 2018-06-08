const mathOperations = ['+', '-', '*', '/', 'plus', 'minus', 'times', 'multiplied', 'divided']


export const calculator = (num1, num2, operation) => {

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

export const mathHandler = (num1, num2, operation) => {

  let answer = calculator(num1, num2, operation)

  window.speechSynthesis.speak(new SpeechSynthesisUtterance(answer))
  this.props.stopListening()
  this.found = true
  this.response = `The answer is ${answer}`
  this.typeOfResponse = 'math'

}

export const checkForMath = (transcriptArr) => {
  let index,
    secondIndex,
    spokenOperation = mathOperations.find((operation) => transcriptArr.includes(operation))
    //return transcriptArr.includes(operation)
  //})

  if (spokenOperation) {
    index = transcriptArr.indexOf(spokenOperation)
    secondIndex = spokenOperation === 'divided' || spokenOperation === 'multiplied' ? index + 2 : index + 1
    mathHandler(transcriptArr[index - 1], transcriptArr[secondIndex], spokenOperation)
  }
}


export const addition = (num1, num2) => +(num1) + +(num2)

export const subtraction = (num1, num2) => num1 - num2

export const multiplication = (num1, num2) => num1 * num2

export const division = (num1, num2) => num1 / num2

