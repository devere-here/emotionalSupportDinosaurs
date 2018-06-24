import React, { Component } from 'react'
import { MainDefinitionResponse, MainEmotionalResponse, MainListResponse, MainMathResponse,MainWeatherResponse, ErrorResponse } from './index'

export default class MainResponse extends Component{
  constructor(props){
    super(props)
  }

  renderSwitch = (type) => {
    console.log('in the render switch props are', this.props)
    let { response, finishedAsync, definition, videoUrl, addedMedia, emotionalResponse, weatherImage, dictionaryImage} = this.props
    switch (type) {
      case 'feeling':
        return <MainEmotionalResponse response={response} addedMedia={addedMedia} emotionalResponse={emotionalResponse} />
      case 'weather':
        return <MainWeatherResponse response={response} weatherImage={weatherImage} />
      case 'math':
        return <MainMathResponse response={response} />
      case 'list':
        return <MainListResponse response={response} />
      case 'definition':
        this.transcript = ''
        return <MainDefinitionResponse dictionaryImage={dictionaryImage} definition={definition} finishedAsync={finishedAsync} />
      default:
        return <ErrorResponse />
    }
  }

  render = () => (

    <div>
      {console.log('in main response')}
      {this.renderSwitch(this.props.type)}
    </div>
  )
}
