import React from 'react'

const MainEmotionalResponse = (props) => (
  <div>
    <h2 id="audioDinoH2">{props.response}</h2>
    <div className="responseImage">{props.addedMedia}</div>
    <div>{ props.emotionalResponse() }</div>
  </div>
)

export default MainEmotionalResponse
