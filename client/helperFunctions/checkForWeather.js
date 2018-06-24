
export const checkForWeather = (transcriptArr) => {
  let spokenWeather = transcriptArr.find((currentWord) => currentWord === 'weather' || currentWord === 'temperature')

  return spokenWeather
}

export default checkForWeather
