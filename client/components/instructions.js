import React from 'react'
import {Link} from 'react-router-dom'

const Instructions = () => (
  <div>
  <div id="about">
    <div>
      <h1 id="aboutTextH1">Instructions</h1>
      <hr />
      <h3 id="aboutTextH3">
      <h2>Be Polite</h2>
      The dinosaurs can start listening when you press the start button on the audio page.
      All actions are triggered by the keyword Please. When you say please this program will then parse everything you said and looks for certain keywords or phrases that trigger specific actions.
      <h2>Emotional Keywords</h2>
      <ul>
        <li>Happy - will be happy because you're happy</li>
        <li>Sad - tells you how to manage sadness and shows a video to make you less sad</li>
        <li>Angry - asks you to take a deep breath tells you how to manage anger and shows a video to help you calm down</li>
        <li>Nervous - asks you to take a deep breath tells you different steps you can take to be less nervous</li>
        <li>Lonely - tells you that it's here for you</li>
      </ul>
      <h2>Dictionary Keywords</h2>
      <ul>
        <li>Define - will define whatever word you said after define.</li>
        <li>Definition of - will define whatever word you said after the phrase definition of.</li>
      </ul>
      <h2>Calculator Keywords</h2>
      <ul>
        <li>Plus - adds the number you said before and after this word. </li>
        <li>Minus - subtracts the number you said before and after this word. </li>
        <li>Times, multiplied by - multiplies the number you said before and after this word. </li>
        <li>divided by - divides the number you said before and after this word.</li>
      </ul>
      <h2>Weather Keywords</h2>
        <ul>
          <li>Temperature, Weather - gives you the temperature and weather</li>
        </ul>
      <h2>To-do List Keywords</h2>
        <ul>
          <li>To-do list - this keyword will trigger all to do list operations. The specific operation will depend on what word you say in relation to to-do list in your sentence. If there are no to-do list specific keywords then the dinosaur will just tell you your to-do list.</li>
          <li>Add - adds a new task to your to-do list. The task will be whatever you say after the word 'add' and before the phrase 'to my to-do list'.</li>
          <li>Remove - removes a task from your to-do list. The task will be whatever you say after the word 'remove' and before the phrase 'to my to-do list' Only works if the phrase you say exists on the to-do list.</li>
        </ul>
      </h3>
      <div id="aboutPageButtonContainer">
        <Link className="aboutPageButton" to="/about">About</Link>
        <Link className="aboutPageButton" to="/choose">Choose Your Dinosaur</Link>
      </div>
    </div>
  </div>
  </div>
)

export default Instructions;
