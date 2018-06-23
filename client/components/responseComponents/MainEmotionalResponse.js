import React from 'react'

const MainEmotionalResponse = (props) => (
  <div>
    <h1>{props.response}</h1>
    <iframe width="560" height="315" src={`${props.videoUrl}?autoplay=1`} allow="autoplay; encrypted-media" allowFullScreen />
  </div>
)

export default MainEmotionalResponse
