/**
 * @require
 * These endpoints require the SpotifyWebAPI module for Node.js.
 */
const SpotifyWebApi = require('spotify-web-api-node')

/**
 * @require
 * We need a configuration file for authentication.
 */
const AuthConfig = require('../config/auth')

/**
 * Represents a SpotifyWebAPI object which is
 * used to interact with the Spotify Web API.
 */
const spotifyApi = new SpotifyWebApi({
  clientId: AuthConfig.CLIENT_ID,
  clientSecret: AuthConfig.CLIENT_SECRET,
})

/**
 * @constant
 * constant defining the maximum number of songs that 
 * can be generated as part of a playlist.
 */
const MAX_SONGS_IN_PLAYLIST = 20

let access_token = null

/**
 * Callback function fetches an authentication token
 * for Spotify login, which is used to call API
 * endpoints that require user login.
 * It uses the SpotifyWebAPI's clientCredentialsGrant function.
 * @function
 */
// fetches a new token
const fetchNewToken = (callback) => {
  console.log('Fetching new token')
  spotifyApi
    .clientCredentialsGrant()
    .then((data) => {
      access_token = data.body['access_token']
      const expires_in = data.body['expires_in']
      spotifyApi.setAccessToken(access_token)
      callback && callback(access_token)
      setTimeout(() => {
        fetchNewToken()
      }, (expires_in - 10 * 60) * 1000) // refresh it in expires_in - 10 min
    })
    .catch((e) => {
      console.error('fetchNewToken > Error fetching new token', e)
    })
}

/* returns a new token or the cached one if still valid */
/**
 * getToken takes in a callback function.
 * if the cached access token is still valid, it returns
 * that token. else, it generates a new token using
 * fetchNewToken.
 * @function
 */
const getToken = (callback) => {
  if (access_token !== null) {
    callback && callback(access_token)
  } else {
    fetchNewToken(callback)
  }
}

/** 
 * @function
 * @deprecated
 * This API endpoint generates a playlist. However, it is not 
 * used in the project right now as it does not
 * generate a personalized playlist.
 */
exports.generatePlaylist = async (req, res) => {
  const { mood } = req.body
  getToken(() => {
    // get recommendations from songs
    spotifyApi
      .getRecommendations({
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
  })
}