const mathOperations = ['+', '-', '*', '/', 'plus', 'minus', 'times', 'multiplied', 'divided']

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


