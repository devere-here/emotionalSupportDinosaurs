const feelings = ['happy', 'sad', 'lonely', 'nervous', 'angry']

const checkForEmotion = (transcriptArr) => {

  let spokenFeeling = feelings.find((feeling) => transcriptArr.includes(feeling))

  return spokenFeeling
}

export default checkForEmotion
