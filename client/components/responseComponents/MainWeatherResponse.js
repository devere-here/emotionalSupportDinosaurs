import React from 'react'

const MainWeatherResponse = (props) => (
  <div>
    <h1>{props.response}</h1>
    <img width="560" height="315" src={props.weatherImages[props.data.weather[0].main]} />
  </div>
)

export default MainWeatherResponse
