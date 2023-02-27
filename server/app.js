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

const app = express()

app
  .use(express.static(__dirname + '/public'))
  .use(cors())
  .use(cookieParser())
  .use(express.json())

app.get('/login', authController.login)

app.get('/callback', authController.callback)

app.get('/refresh_token', authController.refreshToken)

app.post('/playlist/save', authController.savePlaylist)

app.post('/playlist/generate', apiController.generatePlaylist)

console.log('Listening on 8888')
app.listen(8888)

module.exports = app
