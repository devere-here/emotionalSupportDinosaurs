const mathOperations = ['+', '-', '*', '/', 'plus', 'minus', 'times', 'multiplied', 'divided']

const checkForMath = (transcriptArr) => {
  let index,
    secondIndex,
    spokenOperation = mathOperations.find((operation) => transcriptArr.includes(operation))

  if (spokenOperation) {
    index = transcriptArr.indexOf(spokenOperation)
    secondIndex = spokenOperation === 'divided' || spokenOperation === 'multiplied' ? index + 2 : index + 1

    return {
      num1: transcriptArr[index - 1],
      num2: transcriptArr[secondIndex],
      operation: spokenOperation
    }
  }

  return null
}

export default checkForMath
