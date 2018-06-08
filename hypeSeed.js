const { MotivationalWords, ToDo } = require('./server/db/models')
const db = require('./server/db')

function CreatePhrase(keyword, phrase, videoUrl){
  this.keyWord = keyword
  this.motivationalWords = phrase
  this.videoUrl = videoUrl
}

function CreateTask(task){
  this.task = task
}

let phraseArr = []
phraseArr.push(new CreatePhrase('happy', 'I\'m happy that you\'re happy', 'https://www.youtube.com/embed/VWs6HJJC8jw'))
phraseArr.push(new CreatePhrase('sad', 'I hope this makes you feel better', 'https://www.youtube.com/embed/69SzfigTO7M'))
phraseArr.push(new CreatePhrase('angry', 'Take a deep breath and count to 10', 'https://www.youtube.com/embed/pd4j9osCNT4'))
phraseArr.push(new CreatePhrase('nervous', 'Take a deep breath', 'https://www.youtube.com/embed/WWloIAQpMcQ'))
phraseArr.push(new CreatePhrase('lonely', `I'm your friend and I'm here for you!`, 'https://www.youtube.com/embed/v7LBggDKEtM'))

let taskArr = []
taskArr.push(new CreateTask('Do the dishes'))
taskArr.push(new CreateTask('Clean my room'))


const seed = () => {
  console.log('phraseArr', phraseArr)
  console.log('taskArr', taskArr)

  Promise.all(phraseArr.map(phraseObj =>
    MotivationalWords.create(phraseObj))
  )
  .then(() => {
    return Promise.all(taskArr.map(taskObj =>
      ToDo.create(taskObj))
    )
  })
  .then(() => db.close())
  .then(() => console.log('db has been closed'))
  .catch((err) => {
      console.log('seeding error')
      console.error(err)
  })

}

console.log('in the seed file')

//syncs db and then run seed function
db.sync({ force: true})
.then(() => seed())
.then(() => console.log('finished'))

