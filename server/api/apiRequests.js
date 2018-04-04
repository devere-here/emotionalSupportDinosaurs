const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const axios = require('axios');
const ImageApi = require('gettyimages-api');

module.exports = router;

router.post('/', asyncHandler(async (req, res, next) => {

  req.body.word = req.body.word.toLowerCase();
  console.log('about to get stock photo');

  var imageCreds = { apiKey: '5cur8arcz3m6aww3bcqaju5s', apiSecret: 'UGXNMKjnTdG6SkuJTJpt3AcZNUuzGEzxdYFDDnpNVw5Bk', username: 'stevendeverehere', password: '2Diz+Kit3' };

  let value = await axios.get(`https://owlbot.info/api/v2/dictionary/${req.body.word}/?format=json`);

  let client = new ImageApi(imageCreds);
  client.search().images().withPage(1)
  .withPageSize(1)
  .withPhrase(`${req.body.word}`)
      .execute(function(err, response) {
          if (err) throw err
          value.data[0].image = response.images[0].display_sizes[0].uri;

          res.json(value.data);
      });
}));

