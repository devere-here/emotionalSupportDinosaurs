import React from 'react'

const MainWeatherResponse = (props) => (
  <div>
    <h1>{props.response}</h1>
    <img width="560" height="315" src={props.weatherImage} />
  </div>
)

export default MainWeatherResponse
