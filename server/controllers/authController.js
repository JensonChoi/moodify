/**
 * @require
 * Require request library to make HTTP Requests.
 */
const request = require('request') // "Request" library
const querystring = require('querystring')
/**
 * @require
 * Require the SpotifyWebAPI for Node.js to make
 * API requests to the Spotify API.
 */
const SpotifyWebApi = require('spotify-web-api-node')

const AuthConfig = require('../config/auth')

/**
 * @constant
 * These client URLs and client secrets are used from the
 * .env file to access the Spotify Web Developer API.
 */
const client_id = AuthConfig.CLIENT_ID
const client_secret = AuthConfig.CLIENT_SECRET
const redirect_uri = 'http://localhost:8888/callback/' // Your redirect uri

const stateKey = 'spotify_auth_state'

const spotifyApi = new SpotifyWebApi({
  clientId: client_id,
  clientSecret: client_secret,
})

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = (length) => {
  let text = ''
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

/**
 * Endpoint (/login) used to login to the user's
 * Spotify account. Uses Spotify authentication.
 * @param {*} req The HTTP Request
 * @param {*} res The HTTP Response
 */
exports.login = (req, res) => {
  const state = generateRandomString(16)
  res.cookie(stateKey, state)

  // your application requests authorization
  const scope = 'user-read-private playlist-modify-private user-top-read'
  res.redirect(
    'https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state,
      })
  )
}

/**
 * endpoint /callback
 * 
 * This is for authentication. It is called when the user
 * attempts to login via the login endpoint, and performs
 * the Spotify authentication.
 * 
 * @param {*} req HTTP Request
 * @param {*} res HTTP Response
 */
exports.callback = (req, res) => {
  // your application requests refresh and access tokens
  // after checking the state parameter

  const code = req.query.code || null
  const state = req.query.state || null
  const storedState = req.cookies ? req.cookies[stateKey] : null

  if (state === null || state !== storedState) {
    res.redirect(
      '/#' +
        querystring.stringify({
          error: 'state_mismatch',
        })
    )
  } else {
    res.clearCookie(stateKey)
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code',
      },
      headers: {
        Authorization:
          'Basic ' +
          new Buffer(client_id + ':' + client_secret).toString('base64'),
      },
      json: true,
    }

    request.post(authOptions, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const access_token = body.access_token,
          refresh_token = body.refresh_token
        spotifyApi.setAccessToken(access_token)
        spotifyApi.setRefreshToken(refresh_token)

        const options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { Authorization: 'Bearer ' + access_token },
          json: true,
        }

        // use the access token to access the Spotify Web API
        request.get(options, (error, response, body) => {
          console.log(body)
        })

        // we can also pass the token to the browser to make requests from there
        const url =
          process.env.ENVIRONMENT === 'local'
            ? 'http://localhost:3000'
            : 'https://moodify1.netlify.app'
        res.redirect(url)
        // res.redirect(
        //   '/#' +
        //     querystring.stringify({
        //       access_token: access_token,
        //       refresh_token: refresh_token,
        //     })
        // )
      } else {
        res.redirect(
          '/#' +
            querystring.stringify({
              error: 'invalid_token',
            })
        )
      }
    })
  }
}

/**
 * This function is called in the /refresh_token endpoint.
 * it's called to refresh the access token in case user has been logged out,
 * permissions have changed since development, etc.
 * @param {*} req HTTP Request
 * @param {*} res HTTP Response
 */
exports.refreshToken = (req, res) => {
  // requesting access token from refresh token
  const refresh_token = req.query.refresh_token
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      Authorization:
        'Basic ' +
        new Buffer(client_id + ':' + client_secret).toString('base64'),
    },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token,
    },
    json: true,
  }

  request.post(authOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const access_token = body.access_token
      SpotifyApi.setAccessToken(access_token)
      res.send({
        access_token: access_token,
      })
    }
  })
}

/**
 * This function is called for API endpoint
 * /playlist/save. It takes in the name of the playlist,
 * description, and an array of track URIs in the request body,
 * and saves this playlist to the account of the logged in user.
 * @param {*} req HTTP Request
 * @param {*} res HTTP Response
 */
exports.savePlaylist = (req, res) => {
  const { name, description, track_uris } = req.body
  //res.redirect('/login')
  spotifyApi
    .createPlaylist(name, {
      description: description,
      public: false,
    })
    .then(
      (data) => {
        const playlistId = data.body.id
        spotifyApi.addTracksToPlaylist(playlistId, track_uris).then(
          (data) => {
            res.status(200).json({ data: data })
          },
          (err) => {
            res.status(500).json({ error: err })
          }
        )
      },
      (err) => {
        res.status(500).json({ error: err })
      }
    )
}

/**
 * This function is called for endpoint
 * /playlist/personal_generate. It takes in a mood in the request,
 * and generates a playlist by using the 4-5 top artists of the
 * logged-in user as seed artists, and the mood as a seed genre.
 * It then calls the SpotifyAPI's getRecommendations endpoint
 * to generate 20 tracks that fit in with these seed genres/artists.
 * This endpoint returns an array of the track data.
 * @param {*} req HTTP Request
 * @param {*} res HTTP Response
 */
exports.generatePersonalPlaylist = (req, res) => {
  const { mood } = req.body
  const MAX_SONGS_IN_PLAYLIST = 20
  // res.redirect('/login')
  // get top artists for profile logged in
  spotifyApi
    .getMyTopArtists({
      limit: 4, //return max 5 items bc recommendations only takes 5
      time_range: 'medium_term',
    })
    .then(
      (data) => {
        // get all artist ids of top 5 artists
        let artist_ids = data.body.items.map((item) => item.id)
        //convert artist_ids to comma-separated string for next api call
        let seed_artists = artist_ids.join(',')
        spotifyApi
          .getRecommendations({
            seed_artists: seed_artists,
            seed_genres: mood,
            limit: MAX_SONGS_IN_PLAYLIST,
          })
          .then(
            (data) => {
              let recommendations = data.body
              res.status(200).json({ tracks: recommendations.tracks })
            },
            (err) => {
              res.status(500).json({ error: err })
            }
          )
      },
      (err) => {
        res.status(500).json({ error: err })
      }
    )
}
