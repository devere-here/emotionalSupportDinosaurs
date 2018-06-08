const Sequelize = require('sequelize'),
  db = require('../db')

const MotivationalWords = db.define('motivationalWords', {
  keyWord: {
    type: Sequelize.STRING
  },
  motivationalWords: {
    type: Sequelize.TEXT
  },
  videoUrl: {
    type: Sequelize.STRING
  }

})

module.exports = MotivationalWords
