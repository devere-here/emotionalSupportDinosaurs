const parseCommand = (transcript, listening) => {

  let transcriptArr = transcript.split(' ')

  if (listening === true) {
    for (let word of transcriptArr) {

      if (word === 'please') {

        transcriptArr = transcriptArr.map((currentWord) => {
          return currentWord.toLowerCase()
        })

        let spokenEmotion = checkForEmotion(transcriptArr)

        if (spokenEmotion){
          this.emotionHandler(spokenEmotion)
        }

        let wordToDefine = checkForDefinition(transcriptArr)

        if (wordToDefine){
          this.definitionHandler(wordToDefine)
        }

        let mathOperationData = checkForMath(transcriptArr)

        if (mathOperationData){
          this.mathHandler(mathOperationData)
        }

        let weather = checkForWeather(transcriptArr)

        if (weather){
          this.weatherHandler(this.weather)
        }

        let listData = checkForList(transcriptArr, this.props.toDoList)

        if (listData){
          this.toDoListHandler(listData)
        }
      }
    }
  }
}
