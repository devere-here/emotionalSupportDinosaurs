import React, { Component } from 'react'
import {connect} from 'react-redux'
//import SpeechRecognition from 'react-speech-recognition'
import { fetchPhrases } from '../store'


class DefintionRecognition extends Component{

  componentWillReceiveProps(nextProps){
    nextProps.startListening();
  }


  render() {

    // if (!browserSupportsSpeechRecognition) {
    //   return null
    // }

    return (
      <div>
        <h1>In definitions</h1>
        <p>words in def: {this.props.transcript}</p>
      </div>
    )
  }

}

/**
 * CONTAINER
 */
const mapState = (state, ownProps) => {

  return {
    transcript: ownProps.transcript

  }
}


const mapDispatch = dispatch => {
  return {
    loadPhraseData () {
      dispatch(fetchPhrases(dispatch))
    }
  }
}

export default connect(mapState, mapDispatch)(DefintionRecognition);
