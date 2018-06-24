import React, { Component } from 'react'
import { connect } from 'react-redux'
import SpeechRecognition from 'react-speech-recognition'
import { fetchPhrases, fetchDefinition, fetchTasks, removeTask, addTask } from '../store'
import axios from 'axios'
import GifPlayer from 'react-gif-player'
import EmotionalComponents from './emotionalComponents'
import { checkForEmotion, checkForDefinition, checkForMath, calculate, checkForWeather, checkForList } from '../helperFunctions'
import { MainResponse } from './responseComponents'

class NewNewAudioRecognition extends Component {
  constructor(props) {
    super(props)

    this.getGeoLocation()
    this.props.loadPhraseData()
    this.props.loadToDoList()

    this.state = {
      response: '',
      videoUrl: '',
      weather: '',
      listening: false,
      typeOfResponse: '',
      found: false,
      finishedAsync: false,
      addedMedia: '',
      dinosaurGifUrl: ''
    }
  }

  isAsyncActionComplete = (nextProps) => (Object.keys(nextProps).length !== 0 && this.props.definition !== nextProps.definition) || this.props.toDoList.length !== nextProps.toDoList.length

  componentWillReceiveProps = (nextProps) => {
    if (this.isAsyncActionComplete(nextProps)) this.setState({finishedAsync: true})
  }

  componentDidMount = () => {
    let url
    switch(this.props.dinosaur){
      case 'stegosaurus':
        url = 'https://drive.google.com/uc?export=download&id=1jwO0PLd1G4jNBQcbtsW3zDHsc1_K9Kf-'
        break
      case 'tyrannosaurus':
        url = 'https://drive.google.com/uc?export=download&id=10oYkrHB_q2plQJxzELy8EyKsheHEgEip'
        break
      default: url = 'https://drive.google.com/uc?export=download&id=1G2eR26NW6DJGbUkAsSRsvafatiqzpKR1'
    }
    this.setState({dinosaurGifUrl: url})
  }


  getGeoLocation = async () => {
    let weatherUrl
    if (navigator.geolocation) {

      weatherUrl = await navigator.geolocation.getCurrentPosition((position) => {
        weatherUrl = `https://fcc-weather-api.glitch.me/api/current?lat=${position.coords.latitude}&lon=${position.coords.longitude}`
        axios.get(weatherUrl)
          .then((weatherData) => {
            this.setState({weather: weatherData})
          })
      })
    }
  }

  startTalking = (response, responseType) => {
    this.props.stopListening()
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(response))
    this.setState({
      found: true,
      typeOfResponse: responseType
    })
  }

  parseCommand = (transcript, listening) => {

    let transcriptArr = transcript.split(' ')

    if (listening === true) {
      for (let word of transcriptArr) {
        if (word === 'please') {

          transcriptArr = transcriptArr.map((currentWord) => currentWord.toLowerCase())
          this.checkForKeyWords(transcriptArr)
        }
      }
    }
  }

  checkForKeyWords = (transcriptArr) => {

    let spokenEmotion = checkForEmotion(transcriptArr),
      wordToDefine = checkForDefinition(transcriptArr),
      mathOperationData = checkForMath(transcriptArr),
      weather = checkForWeather(transcriptArr),
      listData = checkForList(transcriptArr, this.props.toDoList)

    if (spokenEmotion) this.emotionHandler(spokenEmotion)
    else if (wordToDefine) this.definitionHandler(wordToDefine)
    else if (mathOperationData) this.mathHandler(mathOperationData)
    else if (weather) this.weatherHandler(this.state.weather)
    else if (listData) this.toDoListHandler(listData)
  }

  clickHandler = () =>  {

    this.props.resetTranscript()
    this.props.listening ? this.props.stopListening() : this.props.startListening()
  
    this.setState({
      addedEmotion: '',
      addedMedia: '',
      finishedAsync: false,
      found: false,
      listening: !this.state.listening
    })
  }

  emotionHandler = (word) => {

    this.setState({
      response: this.props.motivationalWords[word].response,
      videoUrl: this.props.motivationalWords[word].videoUrl,
      addedMedia: <iframe src={`${this.props.motivationalWords[word].videoUrl}?autoplay=1`} allow="autoplay; encrypted-media" allowFullScreen />
    })

    this.startTalking(this.props.motivationalWords[word].response, 'feeling')
    this.state.typeOfEmotion = word
  }

  definitionHandler = async (word) => {
    //await this.props.loadDefinition(word)

    // added due to api problems
    this.props.definition.text = 'Sorry the dictionary feature is currently unavailable'
    this.startTalking(this.props.definition.text, 'definition')

    this.setState({ finishedAsync: true })
  }


  weatherHandler = (weather) => {
    if (weather) {

      let fahrenheit = weather.data.main.temp * 1.8 + 32
      fahrenheit = Math.round(fahrenheit).toString()
      let percipitation = weather.data.weather[0].main === 'Clear' ? 'Clear Skies' : weather.data.weather[0].main
      this.state.response = `It is ${fahrenheit} degrees fahrenheit outside with ${percipitation}`
      this.state.addedMedia = <img height="150px" src={this.props.weatherImages[this.state.weather.data.weather[0].main]} />

    } else {
      this.state.response = 'The temperature and weather is currently unavailiable'
    }

    this.startTalking(this.state.response, 'weather')
  }

  mathHandler = (operationObj) => {
    let answer = calculate(operationObj)
    this.state.response = `The answer is ${answer}`
    this.startTalking(this.state.response, 'math')
  }

  toDoListHandler = taskInfo => {
    let { response, action, task } = taskInfo

    if (action === 'add'){
      this.props.addToToDoList(task)
    } else if (action === 'remove'){
      this.props.removeFromToDoList(task)
    }

    this.state.response = response
    this.startTalking(this.state.response, 'math')
  }

  render = () => {

    const { transcript, browserSupportsSpeechRecognition, listening } = this.props
    let weatherImage = this.state.weather.data ? this.props.weatherImages[this.state.weather.data.weather[0].main] : null
    let responseData = {
      type: this.state.typeOfResponse,
      response: this.state.response,
      finishedAsync: this.state.finishedAsync,
      definition: this.props.definition.text,
      addedMedia: this.state.addedMedia,
      weatherImage: weatherImage,
      emotionalResponse: EmotionalComponents[this.state.typeOfEmotion],
      dictionaryImage: this.props.definition.image
    }

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
          <div id="audioDinoPicture"><GifPlayer gif={this.state.dinosaurGifUrl} /></div>
          {!this.state.typeOfResponse ? null : <MainResponse data={responseData} />}
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => ({
    motivationalWords: state.motivationalWords,
    definition: state.dictionary,
    toDoList: state.toDoList,
    dinosaur: state.dinosaur,
    weatherImages: {
      Clear: 'https://formingthethread.files.wordpress.com/2013/04/clearday.jpg',
      Clouds: 'https://vmcdn.ca/f/files/sudbury/140816_weather.jpg;w=630',
      Rain: 'https://pennalumniblog.files.wordpress.com/2012/01/rainy_day.jpg',
      Snow: 'https://static01.nyt.com/packages/images/multimedia/bundles/projects/2012/AvalancheDeploy/lure-intro.jpg',
      Mist: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOYEFBd9-513q7RB3Af9b_VNk1y2_J5KcFZzXQLLS8virDIUdJ',
      ThunderStorms: 'https://www.flyingmag.com/sites/flyingmag.com/files/styles/1000_1x_/public/images/2017/06/everything-explained-june.jpg?itok=UsjdV7uz&fc=50,50'
    }
})

const mapDispatch = dispatch => {
  return {
    loadPhraseData() {
      dispatch(fetchPhrases())
    },
    loadDefinition(word) {
      dispatch(fetchDefinition(word))
    },
    loadToDoList() {
      dispatch(fetchTasks())
    },
    addToToDoList(task) {
      dispatch(addTask(task))
    },
    removeFromToDoList(task) {
      dispatch(removeTask(task))
    }
  }
}

export default connect(mapState, mapDispatch)(SpeechRecognition({autoStart: false})(NewNewAudioRecognition))
