const asyncHandler = require('express-async-handler'),
  axios = require('axios'),
  ImageApi = require('gettyimages-api'),
  imageCreds = require('../../secrets')

const router = require('express').Router()

module.exports = router

router.post('/', asyncHandler(async (req, res, next) => {

  let value, client

  req.body.word = req.body.word.toLowerCase()

  value = await axios.get(`https://owlbot.info/api/v2/dictionary/${req.body.word}/?format=json`)

  client = new ImageApi(imageCreds)
  client.search().images().withPage(1)
  .withPageSize(1)
  .withPhrase(`${req.body.word}`)
      .execute(function(err, response) {
          if (err) throw err
          value.data[0].image = response.images[0].display_sizes[0].uri
          res.json(value.data)
      })
}))
