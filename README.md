# Emotional Support Dinosurs

Emotional Support Dinosaurs are personal assistants that you communicate to by talking. A much simpler version of the Amazon Echo or Google Home. This app was designed primarily for kids and focuses on helping kids understand their emotions better. Our app does this by giving kids funny videos when they express that they are sad, lonely, angry, etc. Under the videos are small blurbs about what these emotions mean, why it's ok to feel them, and what kids can do about those emotions. To make Emotional Support Dinosaurs act like personal assistants I've added some ancillary features such as the ability to provide definitions and visual examples of words via a dictionary and stock photo API, make basic calculations, give the current weather, and build and manage a to-do list. 

This repo uses the Fullstack Academy fullstack app boilerplate.

## Setup

Clone this repo and enter `npm run build-client` in the command line to configure you bundle.js, or you can configure your bundle and run your server at the same time using `npm run start-dev`.

If you want to run the server and/or webpack separately, you can also `npm run start-server` and `npm run build-client`.


## How to interact with the dinosaurs

The dinosaurs can start listening when you press the `start` button on the audio page.

All actions are triggered by the keyword `Please`. When you say please this program will then parse everything you said and looks for certain keywords or phrases that trigger specific actions.

### Emotional Keywords

- `Sad` - tells you how to manage sadness and show a video to make you less sad

### Dictionary Keywords

- `Define` - will define whatever word you said after define.
- `Definition of` - will define whatever word you said after the phrase `definition of`.

### Calculator Keywords

- `plus` - adds the number you said before and after this word. (These words must be numbers)
- `minus` - subtracts the number you said before and after this word. (These words must be numbers)
- `times`, `multiplied by` - multiplies the number you said before and after this word. (These words must be numbers)
- `divided by` - divides the number you said before and after this word. (These words must be numbers)

### Weather Keywords

- `temperature, weather` - gives you the temperature and weather

### To-do List Keywords

- `to-do list` - this keyword will trigger all to do list operations. The specific operation will depend on what word you say in relation to `to-do list` in your sentence. If there are no to-do list specific keywords then the dinosaur will just tell you your to-do list.
- `add` - adds a new task to your to-do list. The task will be whatever you say after the word 'add' and before the phrase 'to my to-do list'.
- `remove` - removes a task from your to-do list. The task will be whatever you say after the word 'remove' and before the phrase 'to my to-do list' Only works if the phrase you say exists on the to-do list.



