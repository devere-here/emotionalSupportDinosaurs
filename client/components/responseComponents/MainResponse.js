import React, { Component } from 'react'
import { MainDefinitionResponse, MainEmotionalResponse, MainListResponse, MainMathResponse,MainWeatherResponse, ErrorResponse } from './index'

export default class MainResponse extends Component{
  renderSwitch = (type) => {
    switch (type) {
      case 'feeling':
        return <MainEmotionalResponse />
      case 'weather':
        return <MainWeatherResponse />
      case 'math':
        return <MainMathResponse />
      case 'list':
        return <MainListResponse />
      case 'definition':
        this.transcript = ''
        return <MainDefinitionResponse />
      default:
        return <ErrorResponse />
    }
  }

  render = () => (
    <div>
      {this.renderSwitch(this.props.type)}
    </div>
  )
}
