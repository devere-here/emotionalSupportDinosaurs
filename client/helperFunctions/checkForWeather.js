
export const checkForWeather = (transcriptArr, currentWeather) => {
  let spokenWeather = transcriptArr.find((currentWord) => currentWord === 'weather' || currentWord === 'temperature')

  console.log('spokenWeather is', spokenWeather)

  return spokenWeather
}

export default checkForWeather
