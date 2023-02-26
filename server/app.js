/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

const express = require('express') // Express web server framework
const cors = require('cors')
const cookieParser = require('cookie-parser')

const authController = require('./controllers/authController')
const apiController = require('./controllers/apiController')
const openaiController = require('./controllers/openaiController')

const { Configuration, OpenAIApi } = require("openai");

const app = express()

app
  .use(express.static(__dirname + '/public'))
  .use(cors())
  .use(cookieParser())
  .use(express.json())

app.get('/login', authController.login)

app.get('/callback', authController.callback)

app.get('/refresh_token', authController.refreshToken)

app.post('/playlist/generate', apiController.generatePlaylist)

app.get('/generate_art', async (req, res) => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  //console.log("REQUEST: ", req)
  const mood = req.query.mood;
  try {
    const response = await openai.createImage({
      prompt: mood,
      n: 1,
      size: "1024x1024",
    });
    res.send(response.data.data[0].url);
  } catch (err) {
    //console.log(err);
    res.status(500).send("Error generating image.");
  }
});

console.log('Listening on 8888')
app.listen(8888)

module.exports = app
