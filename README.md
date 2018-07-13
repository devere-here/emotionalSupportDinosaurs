# Emotional Support Dinosurs

Emotional Support Dinosaurs are personal assistants that you communicate to by talking. A much simpler version of the Amazon Echo or Google Home. This app was designed primarily for kids and focuses on helping kids understand their emotions better. Our app does this by giving kids funny videos when they express that they are sad, lonely, angry, etc. Under the videos are small blurbs about what these emotions mean, why it's ok to feel them, and what kids can do about those emotions. To make Emotional Support Dinosaurs act like personal assistants I've added some ancillary features such as the ability to provide definitions and visual examples of words via a dictionary and stock photo API, make basic calculations, give the current weather, and build and manage a to-do list. 

This repo uses the Fullstack Academy fullstack app boilerplate.

## Built With
* [React](https://reactjs.org/) - Front-End Javascript Library for building the UI
* [Redux](https://redux.js.org/) - Predictable state container
* [React Speech Recognition](https://www.npmjs.com/package/react-speech-recognition) - Voice Recognition Software
* [Node](https://nodejs.org/en/) - Backend Javascript runtime environment
* [PostgreSQL](https://www.postgresql.org/) - Object-relational database system
* [Express](https://expressjs.com/) - Web application framework used to connect our front-end and back-end.
* [Sequelize](https://sequelize.readthedocs.io/en/v3/) - Object relational mapper used to access our postgreSQL database.

## How to interact with the dinosaurs

The dinosaurs start listening when you press the `start` button on the audio page.

All actions are triggered by the keyword `Please`. When you say please this program will then parse everything you said and looks for certain keywords or phrases that trigger specific actions. Please note that currently this program only works on chrome.


## Emotional Keywords
- `Sad` - gives you tips on how to manage sadness and show a video to make you less sad
- `Angry` - gives you tips on how to manage anger and show a video to make you less angry
- `Lonely` - gives you tips on how to deal with lonliness and show a video to make you less lonely
- `Nervous` - gives you tips on how to deal with nervousness and show a video to make you less nervous
- `Happy` - congratulates you on your happiness

## Dictionary Keywords
- `Define` - will define whatever word you said after define.
- `Definition of` - will define whatever word you said after the phrase `definition of`.

## Calculator Keywords
- `plus` - adds the number you said before and after this word. (These words must be numbers)
- `minus` - subtracts the number you said before and after this word. (These words must be numbers)
- `times`, `multiplied by` - multiplies the number you said before and after this word. (These words must be numbers)
- `divided by` - divides the number you said before and after this word. (These words must be numbers)

## Weather Keywords
- `temperature, weather` - gives you the temperature and weather

## To-do List Keywords
- `to-do list` - this keyword will trigger all to do list operations. The specific operation will depend on what word you say in relation to `to-do list` in your sentence. If there are no to-do list specific keywords then the dinosaur will just tell you your to-do list.
- `add` - adds a new task to your to-do list. The task will be whatever you say after the word 'add' and before the phrase 'to my to-do list'.
- `remove` - removes a task from your to-do list. The task will be whatever you say after the word 'remove' and before the phrase 'to my to-do list' Only works if the phrase you say exists on the to-do list.

<h2>Choose Your Own Dinosaur Page</h2>
<img src="https://drive.google.com/uc?export=download&id=1cTB2NpgN0ympmAnjFDk-NQHdI3Nd73ha"/>

<h2>Talk To Your Dinosaur Page</h2>
<img src="https://drive.google.com/uc?export=download&id=1tuQkZIOKX2_0b3bxlk2iwxjKOlinsPj0"/>
