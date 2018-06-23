import React, { Component } from 'react'
import { connect } from 'react-redux'
import SpeechRecognition from 'react-speech-recognition'
import { fetchPhrases, fetchDefinition, fetchTasks, removeTask, addTask } from '../store'
import axios from 'axios'
import GifPlayer from 'react-gif-player'
import EmotionalComponents from './emotionalComponents'
import { checkForEmotion, checkForDefinition, checkForMath, calculate } from '../helperFunctions'


class NewNewAudioRecognition extends Component {
  constructor(props) {
    super(props)

    this.getGeoLocation()
    this.props.loadPhraseData()
    this.props.loadToDoList()
    this.response = ''
    this.videoUrl = ''
    this.weather = ''
    this.listening = false
    this.typeOfResponse = ''
    this.found = false
    this.finishedAsync = false
    this.addedMedia = ''

  }

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


  getGeoLocation = async () => {
    let weatherUrl
    if (navigator.geolocation) {

      weatherUrl = await navigator.geolocation.getCurrentPosition((position) => {
        weatherUrl = `https://fcc-weather-api.glitch.me/api/current?lat=${position.coords.latitude}&lon=${position.coords.longitude}`
        axios.get(weatherUrl)
          .then((weatherData) => {
            this.weather = weatherData
          })
      })
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

          let spokenEmotion = checkForEmotion(transcriptArr)

          if (spokenEmotion){
            this.emotionHandler(spokenEmotion)
          }

          let wordToDefine = checkForDefinition(transcriptArr)

          if (wordToDefine){
            this.definitionHandler(wordToDefine)
          }

          let mathOperationData = checkForMath(transcriptArr)

          if (mathOperationData){
            this.mathHandler(mathOperationData)
          }



          this.checkForWeather(transcriptArr)
          this.checkForList(transcriptArr)

        }

      }

    }

  }

  renderSwitch = (type) => {

    switch (type) {
      case 'feeling':
        return (<div><h1>{this.response}</h1>
          <iframe width="560" height="315" src={`${this.videoUrl}?autoplay=1`} allow="autoplay; encrypted-media" allowFullScreen /></div>)
      case 'weather':
        return (<div><h1>{this.response}</h1>
          <img width="560" height="315" src={this.props.weatherImages[this.weather.data.weather[0].main]} /></div>)
      case 'math':
        return (
          <h3>The answer is {this.response}</h3>
        )
      case 'list':
        return (
          <div>
            <h3>The answer is {this.response}</h3>
          </div>
        )
      case 'definition':
        this.transcript = ''
        return (
          <div>
            <h1>definition</h1>
            {!this.finishedAsync
              ? <p>Waiting...</p>
              : (<div>
                <p>{this.props.definition.text}</p>
                <img height="150" src={this.props.definition.image} />
              </div>)
            }
          </div>
        )
      default:
        return (<h1>Hello Steven</h1>)
    }
  }

  clickHandler = () =>  {
    this.listening = !this.listening
    this.found = false
    this.finishedAsync = false
    this.props.resetTranscript()
    this.props.listening ? this.props.stopListening() : this.props.startListening()
    this.addedMedia = ''
    this.addedEmotion = ''
  }

  checkForWeather = (transcriptArr) => {
    let spokenWeather = transcriptArr.find((currentWord) => {
      return currentWord === 'weather' || currentWord === 'temperature'
    })

    if (spokenWeather) {
      this.weatherHandler(this.weather)
    }
  }

  checkForList = (transcriptArr) => {
    if (transcriptArr.includes('list')) {
      let index = transcriptArr.indexOf('list')
      if ((transcriptArr[index - 2] === 'to' && transcriptArr[index - 1] === 'do') || transcriptArr[index - 1] === 'to-do') {
        this.toDoListHandler(transcriptArr, index)

      }
    }
  }

  emotionHandler = (word) => {

    // can i add these to the redux store?
    this.response = this.props.motivationalWords[word].response
    this.videoUrl = this.props.motivationalWords[word].videoUrl
    this.addedMedia = <iframe src={`${this.videoUrl}?autoplay=1`} allow="autoplay; encrypted-media" allowFullScreen />
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(this.response))
    this.props.stopListening()
    this.found = true
    this.typeOfResponse = 'feeling'
    this.typeOfEmotion = word

  }

  definitionHandler = async (word) => {
    this.typeOfResponse = 'definition'
    this.found = true
    this.props.stopListening()

    //await this.props.loadDefinition(word)

    // added due to api problems
    this.props.definition.text = 'Sorry the dictionary feature is currently unavailable'
    this.finishedAsync = true
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(this.props.definition.text))

  }


  weatherHandler = (weather) => {

    if (weather) {

      let fahrenheit = weather.data.main.temp * 1.8 + 32
      fahrenheit = Math.round(fahrenheit).toString()
      let percipitation = weather.data.weather[0].main === 'Clear' ? 'Clear Skies' : weather.data.weather[0].main
      this.response = `It is ${fahrenheit} degrees fahrenheit outside with ${percipitation}`
      this.addedMedia = <img height="150px" src={this.props.weatherImages[this.weather.data.weather[0].main]} />

    } else {
      this.response = 'The temperature and weather is currently unavailiable'
    }

    this.found = true
    this.props.stopListening()
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(this.response))
    this.typeOfResponse = 'weather'


  }

  mathHandler = (operationObj) => {

    //let answer = calculator(firstNumber, secondNumber, operation)
    let answer = calculate(operationObj)

    window.speechSynthesis.speak(new SpeechSynthesisUtterance(answer))
    this.props.stopListening()
    this.found = true
    this.response = `The answer is ${answer}`
    this.typeOfResponse = 'math'

  }

  toDoListHandler = (arr, index) => {
    let modifierIndex
    let endingIndex

    if (arr.includes('add')) {
      modifierIndex = arr.indexOf('add')
      endingIndex = arr[index - 1] === 'to-do' ? index - 3 : index - 4

      let newTask = arr.slice(modifierIndex + 1, endingIndex)

      this.props.addToToDoList(newTask.join(' '))

      this.response = `You  have just added ${newTask.join(' ')} to your to-do list`

      window.speechSynthesis.speak(new SpeechSynthesisUtterance(this.response))
      this.props.stopListening()
      this.found = true
      this.typeOfResponse = 'list'
      this.listening = 'false'

    } else if (arr.includes('remove') || arr.includes('delete')) {

      modifierIndex = arr.indexOf('remove')
      if (modifierIndex === -1) {
        modifierIndex = arr.includes('delete')
      }
      endingIndex = arr[index - 1] === 'to-do' ? index - 3 : index - 4
      let removedTask = arr.slice(modifierIndex + 1, endingIndex)


      this.props.removeFromToDoList(removedTask.join(' ').toLowerCase())
      this.response = `You  have just removed ${removedTask.join(' ')} from your to-do list`
      window.speechSynthesis.speak(new SpeechSynthesisUtterance(this.response))


    } else {

      let list = this.props.toDoList.map((task) => task.task)
      list = list.join(', ')

      if (this.props.toDoList.length > 1) {
        let lastIndex = list.lastIndexOf(',')
        list = list.substring(0, lastIndex) + ' and ' + list.substring(lastIndex + 1)
      }

      list = `There are ${this.props.toDoList.length} things on your to do list. You should ${list}`
      window.speechSynthesis.speak(new SpeechSynthesisUtterance(list))
      this.response = list

    }

    this.props.stopListening()
    this.found = true
    this.typeOfResponse = 'list'
    this.listening = 'false'

  }


  render = () => {

    console.log('emotionalComponents', EmotionalComponents)

    const { transcript, browserSupportsSpeechRecognition, listening } = this.props

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
                {console.log('this.typeOfEmotion', this.typeOfEmotion, 'EmotionalComponents[this.typeOfEmotion]', EmotionalComponents[this.typeOfEmotion])}
                <div>{this.typeOfResponse === 'feeling' ? EmotionalComponents[this.typeOfEmotion]() : null}</div>
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

const options = {
  autoStart: false
}


export default connect(mapState, mapDispatch)(SpeechRecognition(options)(NewNewAudioRecognition))
