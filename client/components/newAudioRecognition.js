import React, { Component } from 'react'
import { connect } from 'react-redux'
import SpeechRecognition from 'react-speech-recognition'
import { fetchPhrases, fetchDefinition, fetchTasks, removeTask, addTask } from '../store'
import axios from 'axios'
import GifPlayer from 'react-gif-player'
import emotionalComponents from './emotionalComponents'


export default class AudioRecognition extends Component {


  componentWillReceiveProps = (nextProps) => {

    if ((Object.keys(nextProps).length !== 0 && this.props.definition !== nextProps.definition) || this.props.toDoList.length !== nextProps.toDoList.length) this.finishedAsync = true

  }

  componentDidMount = () => {
    if (this.props.dinosaur === 'stegosaurus') {
      this.dinosaurGifUrl = 'https://drive.google.com/uc?export=download&id=1jwO0PLd1G4jNBQcbtsW3zDHsc1_K9Kf-'
    } else if (this.props.dinosaur === 'tyrannosaurus') {
      this.dinosaurGifUrl = 'https://drive.google.com/uc?export=download&id=10oYkrHB_q2plQJxzELy8EyKsheHEgEip'
    } else {
      this.dinosaurGifUrl = 'https://drive.google.com/uc?export=download&id=1G2eR26NW6DJGbUkAsSRsvafatiqzpKR1'
    }
  }

  parseCommand = (transcript, listening) => {

    let transcriptArr = transcript.split(' ')

    if (listening === true) {
      for (let word of transcriptArr) {

        if (word === 'please') {

          transcriptArr = transcriptArr.map((currentWord) => {
            return currentWord.toLowerCase()
          })

          this.checkForEmotion(transcriptArr)
          this.checkForDefinition(transcriptArr)
          this.checkForMath(transcriptArr)
          this.checkForWeather(transcriptArr)
          this.checkForList(transcriptArr)

        }

      }

    }

  }


  render() {

    const { transcript, listening, browserSupportsSpeechRecognition } = this.props

    if (!browserSupportsSpeechRecognition) {
      return null
    }

    this.parseCommand(transcript, listening)

      return (
        <div id="audioPage">
          <button id="audioPageButton" onClick={this.clickHandler}>{listening ? 'Stop' : 'Start'}</button>
          <div id="audioUserBubble">
            <h2>{transcript}</h2>
          </div>
          <div id="audioDinoBubble">
            <div id="audioDinoPicture"><GifPlayer gif={this.dinosaurGifUrl} /></div>
            {this.typeOfResponse !== 'definition'
            ? (
              <div>
                <h2 id="audioDinoH2">{this.response}</h2>
                <div className="responseImage">{this.addedMedia}</div>
                <div>{this.typeOfResponse === 'feeling' ? emotionalComponents[this.typeOfEmotion] : null}</div>
              </div>
            )
            : (
              <div>{this.renderSwitch(this.typeOfResponse)}</div>
            )
            }
          </div>
        </div>

      )
  }
}
