const checkForDefinition = (transcriptArr) => {

  let index = '',
    spokenDefinition = transcriptArr.find((currentWord) => currentWord === 'define' || currentWord === 'definition' )

  if (spokenDefinition) {
    index = spokenDefinition === 'define'
      ? transcriptArr.indexOf('define') + 1
      : transcriptArr.indexOf('definition') + 2
    return transcriptArr[index]
  }

  return null
}

export default checkForDefinition
