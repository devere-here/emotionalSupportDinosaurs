const checkForDefinition = (transcriptArr) => {

  let index = '',
    spokenDefinition = transcriptArr.find((currentWord) => currentWord === 'define' || currentWord === 'definition' )

  if (spokenDefinition) {
    index = spokenDefinition === 'define'
      ? transcriptArr.indexOf('define') + 1
      : transcriptArr.indexOf('definition') + 2
    //this.definitionHandler(transcriptArr[index])
    return transcriptArr[index]
  }

  return index
}

const definitionHandler = (word) => {
  this.typeOfResponse = 'definition'
  this.found = true
  this.props.stopListening()

  this.props.loadDefinition(word)

}

export default checkForDefinition
