import React, { Component } from 'react'
import { connect } from 'react-redux'
import SpeechRecognition from 'react-speech-recognition'
import { fetchPhrases, fetchDefinition, fetchTasks, removeTask, addTask } from '../store'
import axios from 'axios';
var GifPlayer = require('react-gif-player');

function calculator(firstNumber, secondNumber, operation){

  let answer;
  if (operation === '+' || operation === 'plus') {
    answer = firstNumber + secondNumber;
  } else if (operation === '-' || operation === 'minus') {
    answer = firstNumber - secondNumber;
  } else if (operation === '*' || operation === 'times' || operation === 'multiplied') {
    answer = firstNumber * secondNumber;
  } else if (operation === '/' || operation === 'divided') {
    answer = firstNumber / secondNumber;
  }

  return answer;

}

let addedEmotion = {
    happy: (<h1>Yay!</h1>),
    sad: (<div>
            <p>It's perfectly OK to have sad feelings at times. As long as they don't happen too often or last too long, sad feelings — like all emotions — are just a natural part of life.Everyone feels sad at times.</p>
            <h4>Here are some positive ways to deal with sad feelings:</h4>
            <ul>
              <li><b>Notice how you feel and why:</b> Knowing your emotions helps you understand and accept yourself. If you feel sad, notice it — but don't dwell on it too long or give it too much drama. Show yourself a little understanding. Remind yourself that sadness will pass and you'll feel better.
              </li>
              <li><b>Bounce back from disappointments or failures:</b> When things don't go your way, don't give up! Stay in the game. There's always next time. Give yourself credit for trying.
              </li>
              <li><b>Get support:</b> Even the most capable kids need support. The people in your life who believe in you and care (like parents, friends, and teachers) can comfort you when you feel sad.
              </li>
            </ul>
          </div>),
    angry: (
      <div>
        <p>Anger is a normal and even healthy emotion — but it's important to deal with it in a positive way. Uncontrolled anger can hurt your health and your friendships.</p>
        <h4>Here are some positive ways to deal with anger:</h4>
        <ul>
          <li><b>Think before you speak:</b> In the heat of the moment, it's easy to say something you'll later regret. Take a few moments to collect your thoughts before saying anything.
          </li>
          <li><b>Once you're calm, express your anger:</b> As soon as you're thinking clearly, tell the people you were angry at why you were angry. State your concerns and needs clearly, but try not to hurt their feelings.
          </li>
          <li><b>Identify possible solutions:</b> Work on fixing the issue that made you mad in the first place. Remind yourself that anger won't fix anything and might only make it worse.
          </li>
        </ul>
      </div>
    ),
    nervous: (
      <div>
        <p>Being nervous is never fun or easy. You may feel your heart beating fast, your palms might sweat or feel clammy, and you may even feel a little bit shaky and out of control. All you need to do to calm yourself down is to remember that everyone gets nervous from time to time and that you’re ultimately in control of your mind and body. If you have the right attitude and have some tricks to help calm you, you’ll be able to get rid of those jitters in no time at all.</p>
        <h4>Here are some positive ways to deal with nervousness:</h4>
        <ul>
          <li><b>Take a deep breath:</b> Sometimes, all you need to do to calm down a bit is to focus on the breath rising and falling from your body. Just stop what you’re doing and work on breathing in and breathing out deeply, and letting yourself take long, careful breaths instead of taking the shorter breaths people tend to take when they’re nervous.
          </li>
          <li><b>Distract yourself:</b> Though you can’t ignore your fears or worries forever, if you feel like there’s nothing you can do to address it except to worry more, then you may just want to take your mind off of it for a little while. Do something that you think will help you forget your worries and feel more at ease, such as, Reading or watching TV.
          </li>
          <li><b>Get the nervous energy out:</b> Try releasing the nervous energy you have through physical activity such as dancing, singing, or running.
          </li>
        </ul>
      </div>
    ),
    lonely: (
      <div>
        <p>Don’t let yourself fall into the trap of believing that loneliness is forever. You might feel lonely today, this week, or even this month, but it doesn’t mean you are alone or that you have no one who cares for you. Like all feelings, loneliness is impermanent and it does not define who you are. Accept that you feel lonely, then focus on moving forward.</p>
        <h4>Here are some positive ways to deal with lonliness:</h4>
        <ul>
          <li><b>Help Others:</b> Helping others eases loneliness because it makes us be less focused on ourselves. It could be a classmate or a relative who might benefit from some time hanging out with you.
          </li>
          <li><b>Do something creative:</b> Try a coloring book or a jigsaw puzzle. Or think outside the box and come up with something that is fun and soothing for you to do
          </li>
          <li><b>Sing:</b> It’s almost impossible to feel lonely when you’re singing. I’ve tried it, and it works. Sing solo or let your favorite singer keep you company as you sing together.
          </li>
        </ul>
      </div>
    )

}

class AudioRecognition extends Component {
  constructor(props) {
    super(props);

    this.getGeoLocation();
    this.props.loadPhraseData();
    this.props.loadToDoList();
    this.feelings = ['happy', 'sad', 'tired', 'nervous', 'angry'];
    this.mathOperations = ['+', '-', '*', '/', 'plus', 'minus', 'times', 'multiplied', 'divided'];
    this.clickHandler = this.clickHandler.bind(this);
    this.response = '';
    this.videoUrl = '';
    this.weather = '';
    this.listening = false;
    this.typeOfResponse = '';
    this.found = false;
    this.definitionHandler = this.definitionHandler.bind(this);
    this.emotionHandler = this.emotionHandler.bind(this);
    this.weatherHandler = this.weatherHandler.bind(this);
    this.mathHandler = this.mathHandler.bind(this);
    this.toDoListHandler = this.toDoListHandler.bind(this);
    this.dictionaryUrl = '';
    this.finishedAsync = false;
    this.addedMedia = '';


  }

  componentWillReceiveProps(nextProps) {

    if ((Object.keys(nextProps).length !== 0 && this.props.definition !== nextProps.definition) || this.props.toDoList.length !== nextProps.toDoList.length) {
      this.finishedAsync = true;
    }

  }

  componentDidMount() {
    console.log('this.dinosaur is', this.props.dinosaur);
    if (this.props.dinosaur === 'stegosaurus') {
      this.dinosaurGifUrl = 'https://drive.google.com/uc?export=download&id=1jwO0PLd1G4jNBQcbtsW3zDHsc1_K9Kf-';
    } else if (this.props.dinosaur === 'tyrannosaurus') {
      this.dinosaurGifUrl = 'https://drive.google.com/uc?export=download&id=10oYkrHB_q2plQJxzELy8EyKsheHEgEip';

    } else {
      this.dinosaurGifUrl = 'https://drive.google.com/uc?export=download&id=1G2eR26NW6DJGbUkAsSRsvafatiqzpKR1';

    }

  }


  async getGeoLocation() {
    let weatherUrl;
    if (navigator.geolocation) {

      weatherUrl = await navigator.geolocation.getCurrentPosition((position) => {
        weatherUrl = `https://fcc-weather-api.glitch.me/api/current?lat=${position.coords.latitude}&lon=${position.coords.longitude}`;
        axios.get(weatherUrl)
          .then((weatherData) => {
            this.weather = weatherData;
            console.log('weather data has been set up');
          })
      })
    }
  }

  renderSwitch = (type) => {

    switch (type) {
      case 'feeling':
        return (<div><h1>{this.response}</h1>
          <iframe width="560" height="315" src={`${this.videoUrl}?autoplay=1`} allow="autoplay; encrypted-media" allowFullScreen /></div>);
      case 'weather':
        return (<div><h1>{this.response}</h1>
          <img width="560" height="315" src={this.props.weatherImages[this.weather.data.weather[0].main]} /></div>);
      case 'math':
        return (
          <h3>The answer is {this.response}</h3>
        )
      case 'list':
        return (
          <div>
            {console.log('this should be an array', this.response)}
            <h3>The answer is {this.response}</h3>

          </div>
        )
      case 'definition':
        this.transcript = '';
        return (
          <div>
            <h1>definition</h1>
            {!this.finishedAsync
              ? <p>Waiting...</p>
              : (<div>
                {window.speechSynthesis.speak(new SpeechSynthesisUtterance(this.props.definition.text))}
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


  clickHandler() {
    this.listening = !this.listening;
    this.found = false;
    this.finishedAsync = false;
    this.props.resetTranscript();
    this.props.listening ? this.props.stopListening() : this.props.startListening();
    this.addedMedia = '';
    this.addedEmotion = '';
  }

  onThankYou() {
    this.transcript = '';
    this.props.stopListening();
  }

  async definitionHandler(word) {
    this.typeOfResponse = 'definition';
    this.found = true;
    this.props.stopListening();


    await this.props.loadDefinition(word)

  }

  emotionHandler(word) {

    console.log('this.props.motivationalWords', this.props.motivationalWords);

    this.response = this.props.motivationalWords[word].response;
    this.videoUrl = this.props.motivationalWords[word].videoUrl;
    this.addedMedia = <iframe src={`${this.videoUrl}?autoplay=1`} allow="autoplay; encrypted-media" allowFullScreen />
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(this.response));
    this.props.stopListening();
    this.found = true;
    this.typeOfResponse = 'feeling';
    this.typeOfEmotion = word;

  }

  weatherHandler(weather) {
    console.log('in weatherHandler');

    if (weather) {

      let fahrenheit = weather.data.main.temp * 1.8 + 32;
      fahrenheit = Math.round(fahrenheit).toString();
      let percipitation = weather.data.weather[0].main === 'Clear' ? 'Clear Skies' : weather.data.weather[0].main;
      this.response = `It is ${fahrenheit} degrees fahrenheit outside with ${percipitation}`;
      this.addedMedia = <img height="150px" src={this.props.weatherImages[this.weather.data.weather[0].main]} />

    } else {
      this.response = 'The temperature and weather is currently unavailiable';
    }

    this.found = true;
    this.props.stopListening();
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(this.response));
    this.typeOfResponse = 'weather';


  }

  mathHandler(firstNumber, secondNumber, operation) {

    let answer = calculator(firstNumber, secondNumber, operation)

    window.speechSynthesis.speak(new SpeechSynthesisUtterance(answer));
    this.props.stopListening();
    this.found = true;
    this.response = `The answer is ${answer}`;
    this.typeOfResponse = 'math';

  }

  toDoListHandler(arr, index) {
    let modifierIndex;
    let endingIndex;

    if (arr.includes('add')) {
      modifierIndex = arr.indexOf('add');
      endingIndex = arr[index - 1] === 'to-do' ? index - 3 : index - 4;

      let newTask = arr.slice(modifierIndex + 1, endingIndex);

      this.props.addToToDoList(newTask.join(' '));

      this.response = `You  have just added ${newTask.join(' ')} to your to-do list`;

      window.speechSynthesis.speak(new SpeechSynthesisUtterance(this.response));
      this.props.stopListening();
      this.found = true;
      this.typeOfResponse = 'list';
      this.listening = 'false';

    } else if (arr.includes('remove') || arr.includes('delete')) {

      modifierIndex = arr.indexOf('remove');
      if (modifierIndex === -1) {
        modifierIndex = arr.includes('delete');
      }
      endingIndex = arr[index - 1] === 'to-do' ? index - 3 : index - 4;
      let removedTask = arr.slice(modifierIndex + 1, endingIndex);


      this.props.removeFromToDoList(removedTask.join(' ').toLowerCase());
      this.response = `You  have just removed ${removedTask.join(' ')} from your to-do list`;
      window.speechSynthesis.speak(new SpeechSynthesisUtterance(this.response));


    } else {

      let list = this.props.toDoList.map((task) => task.task);
      list = list.join(', ');

      if (this.props.toDoList.length > 1) {
        let lastIndex = list.lastIndexOf(',');
        list = list.substring(0, lastIndex) + ' and ' + list.substring(lastIndex + 1);
      }

      list = `There are ${this.props.toDoList.length} things on your to do list. You should ${list}`;
      window.speechSynthesis.speak(new SpeechSynthesisUtterance(list));
      this.response = list;

    }

    this.props.stopListening();
    this.found = true;
    this.typeOfResponse = 'list';
    this.listening = 'false';

  }

  render() {
    console.log('dinosaur', this.props.dinosaur);

    const { transcript, browserSupportsSpeechRecognition, listening } = this.props;

    let transcriptArr = transcript.split(' ');
    let prevWord = '';
    let prevPrevWord = '';

    if (listening === true) {
      for (let word of transcriptArr) {
        if (word === 'please') {

          console.log('in please portion');

          let spokenFeeling = this.feelings.find((feeling) => {
            return transcriptArr.includes(feeling);
          });
          if (spokenFeeling) {
            this.emotionHandler(spokenFeeling);
            break;
          }

          let spokenDefinition = transcriptArr.find((word) => {
            return word === 'define' || word === 'definition'
          });
          if (spokenDefinition) {
            let word, index;
            index = spokenDefinition === 'define'
              ? transcriptArr.indexOf('define') + 1
              : transcriptArr.indexOf('definition') + 2
            this.definitionHandler(transcriptArr[index]);
            break;
          }

          let spokenOperation = this.mathOperations.find((operation) => {
            return transcriptArr.includes(operation);
          });

          if (spokenOperation) {
            let index = transcriptArr.indexOf(spokenOperation);
            let secondIndex = spokenOperation === 'divided' || spokenOperation === 'multiplied' ? index + 2 : index + 1;
            this.mathHandler(transcriptArr[index - 1], transcriptArr[secondIndex], spokenOperation);
          }

          let spokenWeather = transcriptArr.find((word) => {
            return word === 'weather' || word === 'temperature'
          });

          if (spokenWeather) {
            console.log('in spoken weather');
            this.weatherHandler(this.weather);
            break;
          }

          if (transcriptArr.includes('list')) {
            let index = transcriptArr.indexOf('list');
            if ((transcriptArr[index - 2] === 'to' && transcriptArr[index - 1] === 'do') || transcriptArr[index - 1] === 'to-do') {
              this.toDoListHandler(transcriptArr, index);

            }
          }

        }

      }

    }

    if (!browserSupportsSpeechRecognition) {
      return null
    }

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
                <div>{this.typeOfResponse === 'feeling' ? addedEmotion[this.typeOfEmotion] : null}</div>
              </div>
            )
            :(
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
const mapState = (state) => {
  console.log('in mapState state is ', state);
  return {
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
  }
}


const mapDispatch = dispatch => {
  return {
    loadPhraseData() {
      dispatch(fetchPhrases());
    },
    loadDefinition(word) {
      dispatch(fetchDefinition(word));
    },
    loadToDoList() {
      dispatch(fetchTasks());
    },
    addToToDoList(task) {
      dispatch(addTask(task));
    },
    removeFromToDoList(task) {
      dispatch(removeTask(task));
    }
  }
}

const options = {
  autoStart: false
}


export default connect(mapState, mapDispatch)(SpeechRecognition(options)(AudioRecognition))
