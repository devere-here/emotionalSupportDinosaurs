
export const checkForWeather = (transcriptArr, currentWeather) => {
  let spokenWeather = transcriptArr.find((currentWord) => currentWord === 'weather' || currentWord === 'temperature')

  if (spokenWeather) {
    // currentWeather is this.weather passed into the fnct
    weatherHandler(currentWeather)
  }
}

export default checkForWeather
