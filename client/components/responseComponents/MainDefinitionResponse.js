import React from 'react'

const MainDefinitionResponse = (props) => (
  <div>
    <h1>definition</h1>
    {!props.finishedAsync
      ? <p>Waiting...</p>
      : (<div>
        <p>{props.definition}</p>
        <img height="150" src={props.dictionaryImage} />
      </div>)
    }
  </div>

)

export default MainDefinitionResponse
