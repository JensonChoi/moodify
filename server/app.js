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

const auth_controller = require('./controllers/authController')
const api_controller = require('./controllers/apiController')

const app = express()

app
  .use(express.static(__dirname + '/public'))
  .use(cors())
  .use(cookieParser())
  .use(express.json())

app.get('/login', auth_controller.login)

app.get('/callback', auth_controller.callback)

app.get('/refresh_token', auth_controller.refresh_token_get)

app.post('/playlist/create', api_controller.playlist_create_post)

console.log('Listening on 8888')
app.listen(8888)

module.exports = app
