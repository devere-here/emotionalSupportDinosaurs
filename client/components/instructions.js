import React from 'react'
import {Link} from 'react-router-dom'

const About = () => (
  <div id="aboutPageContainer">
  <div id="about">
    <div id="aboutTextPortion">
      <h1 id="aboutTextH1">Instructions</h1>
      <hr />
      <h3 id="aboutTextH3">
      <h2>Be Polite</h2>
      The dinosaurs can start listening when you press the start button on the audio page.
      All actions are triggered by the keyword Please. When you say please this program will then parse everything you said and looks for certain keywords or phrases that trigger specific actions.
      <h2>Emotional Keywords</h2>
      Happy - will be happy because you're happy
      Sad - tells you how to manage sadness and shows a video to make you less sad
      Angry - asks you to take a deep breath tells you how to manage anger and shows a video to help you calm down
      Nervous - asks you to take a deep breath tells you different steps you can take to be less nervous
      lonely - the emotional support dinosaur will says that it\'s your friend and that its here for you
      <h2>Dictionary Keywords</h2>
      Define - will define whatever word you said after define.
      Definition of - will define whatever word you said after the phrase definition of.
      <h2>Calculator Keywords</h2>
      plus - adds the number you said before and after this word. (These words must be numbers)
      minus - subtracts the number you said before and after this word. (These words must be numbers)
      times, multiplied by - multiplies the number you said before and after this word. (These words must be numbers)
      divided by - divides the number you said before and after this word. (These words must be numbers)
      <h2>Weather Keywords</h2>
      temperature, weather - gives you the temperature and weather
      <h2>To-do List Keywords</h2>
      to-do list - this keyword will trigger all to do list operations. The specific operation will depend on what word you say in relation to to-do list in your sentence. If there are no to-do list specific keywords then the dinosaur will just tell you your to-do list.
      add - adds a new task to your to-do list. The task will be whatever you say after the word 'add' and before the phrase 'to my to-do list'.
      remove - removes a task from your to-do list. The task will be whatever you say after the word 'remove' and before the phrase 'to my to-do list' Only works if the phrase you say exists on the to-do list.</h3>
      <div id="aboutPageButtonContainer">
        <Link className="aboutPageButton" to="/choose">Choose Your Dinosaur</Link>
      </div>
    </div>
    <div id="aboutPictureContainer" />
  </div>
  </div>
)

export default About;
