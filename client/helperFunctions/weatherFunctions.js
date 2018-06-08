import axios from 'axios'

export const getGeoLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {

      let weatherUrl,
        { latitude, longitude } = position.coords

      weatherUrl = `https://fcc-weather-api.glitch.me/api/current?lat=${latitude}&lon=${longitude}`

      axios.get(weatherUrl)
        .then((weatherData) => {
          return weatherData
        })

    })
  }
}


export const checkForWeather = (transcriptArr, currentWeather) => {
  let spokenWeather = transcriptArr.find((currentWord) => currentWord === 'weather' || currentWord === 'temperature')

  if (spokenWeather) {
    // currentWeather is this.weather passed into the fnct
    weatherHandler(currentWeather)
  }
}


export const weatherHandler = (weather) => {

  if (weather) {

    let fahrenheit = weather.data.main.temp * 1.8 + 32
    fahrenheit = Math.round(fahrenheit).toString()
    let percipitation = weather.data.weather[0].main === 'Clear' ? 'Clear Skies' : weather.data.weather[0].main
    this.response = `It is ${fahrenheit} degrees fahrenheit outside with ${percipitation}`
    this.addedMedia = <img height="150px" src={this.props.weatherImages[this.weather.data.weather[0].main]} />

  } else {
    this.response = 'The temperature and weather is currently unavailiable'
  }

  this.found = true
  this.props.stopListening()
  window.speechSynthesis.speak(new SpeechSynthesisUtterance(this.response))
  this.typeOfResponse = 'weather'


}

export default getGeoLocation
