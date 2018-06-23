import React from 'react'

const MainDefinitionResponse = (props) => (
  <div>
    <h1>definition</h1>
    {!props.finishedAsync
      ? <p>Waiting...</p>
      : (<div>
        {window.speechSynthesis.speak(new SpeechSynthesisUtterance(this.props.definition.text))}
        <p>{props.definition.text}</p>
        <img height="150" src={props.definition.image} />
      </div>)
    }
  </div>

)

export default MainDefinitionResponse
